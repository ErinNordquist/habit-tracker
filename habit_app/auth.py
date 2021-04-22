import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from habit_app.database import execute_sql, query_db, get_db
from habit_app.forms import LoginForm, CreateAccountForm

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/create-account', methods=['GET','POST'])
def create_account():
    form = CreateAccountForm()
    if request.method == 'POST':
        error = None
        db = get_db()
        #check if username already exists
        if db.execute("SELECT username from user WHERE username = (?)", (form.username.data,)).fetchone() is not None:
            error = "Username is taken."

        if error is None:
            db.execute("INSERT INTO USER(username) values (?)", (form.username.data,))
            db.commit()
            #TODO: Add salt and hash to password before saving
            execute_sql("INSERT INTO PASSWORD(username, password_hash) values(?,?)", (form.username.data, form.password.data))
            return redirect(url_for('auth.login'))
        else:
            print(error)
            flash(error)
            return redirect(url_for('auth.create_account'))
    return render_template('create_account.html', title='Create Account', form=form)

@bp.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    error = None
    if request.method == 'POST':

        db = get_db()

        if db.execute("SELECT EXISTS(SELECT 1 from PASSWORD where username = (?))", (form.username.data,)).fetchone()[0] == 1:
            saved_pass_hash= db.execute("SELECT password_hash from PASSWORD where username = (?)", (form.username.data,)).fetchone()[0]
            # TODO: verify entered password against hash
            entered_pass_hash = form.password.data

            if entered_pass_hash == saved_pass_hash:
                # redirect to home
                session.clear()
                session['username'] = form.username.data
                return redirect(url_for('routes.index'))
            else:
                error = "Wrong username/password combination"
        else:
            error = "Wrong username"

    if error is not None:
        flash(error)
        return redirect(url_for('auth.login'))

        #flash('Login requested for user {}, remember me={}'.format(
           # form.username.data, form.remember_me.data
        #))
        #return redirect(url_for('routes.index'))
    return render_template('login.html',title='Login', form = form)
