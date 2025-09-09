# app/models/user.rb
class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  
  before_create :generate_magic_link_token
  
  def generate_magic_link_token!
    self.magic_link_token = SecureRandom.urlsafe_base64(32)
    self.magic_link_sent_at = Time.current
    save!
  end
  
  def magic_link_valid?
    magic_link_sent_at && magic_link_sent_at > 15.minutes.ago
  end
  
  def invalidate_magic_link!
    update!(magic_link_token: nil, magic_link_sent_at: nil)
  end
  
  def self.can_send_magic_link?(email)
    user = find_by(email: email)
    return true unless user&.magic_link_sent_at
    
    user.magic_link_sent_at < 1.minute.ago
  end
  
  private
  
  def generate_magic_link_token
    self.magic_link_token = SecureRandom.urlsafe_base64(32)
  end
end