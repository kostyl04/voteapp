package com.kostyl.voteapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping(value = { "/", "/subjects", "/polls" })
	public String main() {
		return "index";
	}

	@RequestMapping(value = "/polls/{pollLink}")
	public String main2(@PathVariable String pollLink) {
		return "index";
	}
}
