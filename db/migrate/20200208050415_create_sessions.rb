class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.string :check_in
      t.string :check_out

      t.timestamps
    end
  end
end
