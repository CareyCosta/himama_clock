class ChangeCheckInAndCheckOutTypeToStringWithoutTypos < ActiveRecord::Migration[6.0]
  def change
        change_column :sessions, :check_in, :string
        change_column :sessions, :check_out, :string
  end
end
