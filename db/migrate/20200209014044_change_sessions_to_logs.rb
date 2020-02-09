class ChangeSessionsToLogs < ActiveRecord::Migration[6.0]
  def change
    rename_table :sessions, :logs
  end
end
