# app/mailers/authentication_mailer.rb
class AuthenticationMailer < ApplicationMailer
  def magic_link(user)
    @user = user
    @magic_link_url = verify_authentication_url(token: @user.magic_link_token)
    
    mail(
      to: @user.email,
      subject: "Your magic link to sign in"
    )
  end
end