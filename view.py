from flask import request, jsonify, render_template
from model import MovieModel
import flask.views
import json

class TopTenView(flask.views.MethodView):
    def get(self):
        return render_template('show_entries.html')

class AllMovies(flask.views.MethodView):
    def get(self):
        allMovies = MovieModel.get_all()

        return jsonify({
            'success': True,
            'movies': movies
        })

class TodaysTopTen(flask.views.MethodView):
    def get(self):
        queried_date = '2015-08-05'
        queried_date_id = 1
        movies = MovieModel.top_ten(queried_date_id)

        return jsonify({
            'success': True,
            'movies': movies
        })

class AllDates(flask.views.MethodView):
    def get(self):
        dates = MovieModel.get_all_dates()

        return jsonify({
            'success': True,
            'dates': dates
        })

