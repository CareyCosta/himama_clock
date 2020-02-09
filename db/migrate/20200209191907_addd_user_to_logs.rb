class AdddUserToLogs < ActiveRecord::Migration[6.0]
  def change
       add_reference :logs, :user, foreign_key: true
  end
end
