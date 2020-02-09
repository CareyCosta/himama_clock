class ApplicationController < ActionController::API
 include ActionController::Helpers

     def cors_set_access_control_headers
       headers['Access-Control-Allow-Origin'] = 'http://localhost:5100'
       headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
       headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
       headers['Access-Control-Max-Age'] = "1728000"
     end

     def cors_preflight_check
        if request.method == 'OPTIONS'
          headers['Access-Control-Allow-Origin'] = 'http://localhost:5100'
          headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
          headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
          headers['Access-Control-Max-Age'] = '1728000'

          render :text => '', :content_type => 'text/plain'
        end
     end

 skip_before_action :verify_authenticity_token, raise: false

 helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
    def login!
        session[:user_id] = @user.id
    end
    def logged_in?
        !!session[:user_id]
    end
    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
    def authorized_user?
         @user == current_user
    end
    def logout!
         session.clear
    end
end
