import sqlite3
import json

dbFilePath = '/tmp/imdbtopten.db'

_conn = sqlite3.connect(dbFilePath, check_same_thread=False)
_conn.row_factory = sqlite3.Row
_cursor = _conn.cursor()

class MovieModel:
    def __init__(self):
        pass

    @classmethod
    def top_ten(cls, id):
        rows = _cursor.execute(
            'select * from movies where date_id={day_id}' . format(day_id = id)
        )
        return [r['rank'] for r in rows]

    def get_all_dates():
        rows = _cursor.execute(
            'select * from dates'
            )
        return [r['date'] for r in rows]






