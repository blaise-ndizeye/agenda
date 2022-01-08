import * as SQLite from "expo-sqlite"

const database_version = "1.0"

const db = SQLite.openDatabase("AgendaDB", database_version)

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
)

export default db
