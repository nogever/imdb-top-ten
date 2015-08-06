# all the imports
import sqlite3
from contextlib import closing
from flask import Flask, request, jsonify, session, g, redirect, url_for, \
     abort, render_template, flash
from view import TopTenView, TodaysTopTen, AllDates

app = Flask(__name__)
app.config.from_object(__name__)

app.add_url_rule('/',
    view_func = TopTenView.as_view('movies_view'), methods=['GET'])

app.add_url_rule('/getTop',
    view_func = TodaysTopTen.as_view('topten_get'), methods=['GET'])

app.add_url_rule('/getD',
    view_func = AllDates.as_view('all_dates'), methods=['GET'])

if __name__ == '__main__':
    app.run()

