package com.dtdk.response;

public class AuthResponse {
	
	private String jwt;
	private boolean status;

    public AuthResponse(String jwt, boolean status) {
        this.jwt = jwt;
        this.status = status;
    }
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
}
