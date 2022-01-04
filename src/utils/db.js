import * as SQLite from "expo-sqlite"

const database_name = "AgendaDB"
const database_version = "1.0"
const database_size = 200000

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_name,
  database_size
)

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
)

export default db
