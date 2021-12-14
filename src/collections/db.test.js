import db from "./db.js"
import songsCollection from "./songs.json"

test("Should load songs", async () => {
    expect(await db.getSongs()).toEqual(songsCollection)
})