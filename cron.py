import sqlite3
import datetime
from urllib.request import urlopen
from bs4 import BeautifulSoup
from crontab import CronTab

dbFilePath = '/tmp/imdbtopten.db'
_conn = sqlite3.connect(dbFilePath, check_same_thread=False)
_conn.row_factory = sqlite3.Row
_cursor = _conn.cursor()

url = urlopen('http://www.imdb.com/chart/top').read()
soup = BeautifulSoup(url, 'html.parser')

mTitles = soup.select('.titleColumn a')
mRatings = soup.select('.imdbRating strong')
mVotes = soup.select('.posterColumn span[name="nv"]')
mYears = soup.select('.titleColumn .secondaryInfo')
mRanks = soup.select('.posterColumn span[name="rk"]')

add_movie = ("INSERT INTO movies "
               "(rank, title, year, rating, number_of_votes, date_id) "
               "VALUES (?, ?, ?, ?, ?, ?)")

now = datetime.datetime.now()
str_now = now.date().isoformat()
_cursor.execute("INSERT INTO days(dates) VALUES (?)", (str_now,))
date_id = _cursor.lastrowid

for x in range(0, 10):
    mTitle = mTitles[x].text
    mRating = mRatings[x].text
    mVote = mVotes[x]['data-value']
    mYear = mYears[x].text.strip('()')
    mRank = mRanks[x]['data-value']

    data_movie = ( mRank, mTitle, mYear, mRating, mVote, date_id )
    _cursor.execute(add_movie, data_movie)

_conn.commit()

#run the crawler once everyday
cron = CronTab()
job = cron.new(command='python3 cron.py')
job.hour.on(6)
job.enable()




