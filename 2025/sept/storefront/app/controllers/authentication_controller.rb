# app/controllers/authentication_controller.rb
class AuthenticationController < ApplicationController
  def new
    @user = User.new
  end
  
  def create
    # Add rate limiting check
    unless User.can_send_magic_link?(auth_params[:email])
      return redirect_to new_authentication_path, 
                         alert: "Please wait before requesting another link."
    end
    
    @user = User.find_or_create_by(email: auth_params[:email].downcase.strip)
    
    if @user.persisted?
      @user.generate_magic_link_token!
      AuthenticationMailer.magic_link(@user).deliver_now
      
      respond_to do |format|
        format.html { redirect_to magic_link_sent_authentication_path }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace("auth_form", 
            partial: "authentication/magic_link_sent", locals: { email: @user.email })
        end
      end
    else
      respond_to do |format|
        format.html { render :new, status: :unprocessable_entity }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace("auth_form", 
            partial: "authentication/form", locals: { user: @user })
        end
      end
    end
  end
  
  def magic_link_sent
  end
  
  def verify
    @user = User.find_by(magic_link_token: params[:token])
    
    if @user && @user.magic_link_valid?
      @user.invalidate_magic_link!
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Successfully logged in!"
    else
      redirect_to new_authentication_path, alert: "Invalid or expired magic link."
    end
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out successfully!"
  end
  
  private
  
  def auth_params
    params.require(:user).permit(:email)
  end
end