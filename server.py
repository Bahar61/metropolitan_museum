"""Metropolitan Museum"""

from jinja2 import StrictUndefined
from flask_debugtoolbar import DebugToolbarExtension
from flask import Flask, render_template 
import os

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = os.environ.get('MySecretServerKey')

#if an undefined variable used in Jinja2, raises an error.
app.jinja_env.undefined = StrictUndefined


@app.route('/', methods=['GET'])
def index():
    """Homepage."""

    return render_template("homepage.html")


@app.route('/results', methods=['GET'])
def search_arts():
    """Search for arts."""
    
    return render_template("results.html")


if __name__ == '__main__':
    # set debug=True here, to invoke the DebugToolbarExtension 
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    app.config['SECRET_KEY'] = "<MySecretServerKey>"

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')
