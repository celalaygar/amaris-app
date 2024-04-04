package com.project.amaris.util;

public class ApiPath {
	private static final String BASE_PATH = "/api";
	private static final String USER_PATH = "/user";
	private static final String ADMIN_PATH = "/admin";
	private static final String MYACCOUNT_PATH = "/my-account";
	private static final String NOTE = "/note";

	public static final class AdminUserCtrl {
		public static final String CTRL = BASE_PATH + ADMIN_PATH + USER_PATH;
	}
	public static final class MyAccountCtrl {
		public static final String CTRL = BASE_PATH + MYACCOUNT_PATH;
	}
	public static final class NoteCtrl {
		public static final String CTRL = BASE_PATH + NOTE;
	}
}

