class LogsController < ApplicationController
    before_action :cors_preflight_check
    after_action :cors_set_access_control_headers
    before_action :set_log, only: [:show, :update, :destroy]

    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  # GET /logs
  def index
    @logs = Log.order(date: :desc, check_in: :desc)

    if params[:user_id].present?
        @logs = @logs.where(user_id: params[:user_id]).order(date: :desc, check_out: :desc)
    end

    render json: @logs
  end

  # GET /logs/1
  def show
    render json: @log
  end

  # POST /logs
  def create
    @log = Log.new(log_params)

    if @log.save
      render json: @log, status: :created, location: @log
    else
      render json: @log.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /logs/1
  def update
    if @log.update(log_params)
      render json: @log
    else
      render json: @log.errors, status: :unprocessable_entity
    end
  end

  # DELETE /logs/1
  def destroy
    @log.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_log
      @log = Log.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def log_params
      params.require(:log).permit(:check_in, :check_out, :date, :user_id)
    end
end
