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
    def get_all():
        _cursor.execute(
            'select * from movies'
        )
        rows = _cursor.fetchall()
        return [dict(r) for r in rows]

    @classmethod
    def top_ten(cls, id):
        _cursor.execute(
            'select * from movies where date_id={day_id}' . format(day_id = id)
        )
        rows = _cursor.fetchall()
        return [dict(r) for r in rows]

    @classmethod
    def get_all_dates(d):
        _cursor.execute(
            'select * from days'
        )
        rows = _cursor.fetchall()
        return [dict(r) for r in rows]






