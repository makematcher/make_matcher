class Api::Controller < ApplicationController
  before_action :validate_request!

  def status
    render json: { status: "Online" }, status: 200
  end

  def invalid
    render json: { status: "Invalid endpoint" }, status: 404
  end

  private

  def validate_request!
    token = request.headers["Authorization"].gsub("Bearer ", "")
    return true if ApiKey.validate(token)

    render json: { status: "Unauthorized" }, status: 403
  end
end
