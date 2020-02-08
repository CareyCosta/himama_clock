class ChangeCheckInAndCheckOutTypeToTime < ActiveRecord::Migration[6.0]
  def change
    change_column :sessions, :check_in, :time
    change_column :sessions, :check_out, :time
  end
end
