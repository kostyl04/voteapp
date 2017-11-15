package com.kostyl.voteapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping(value={"/","/subjects","/polls"})
	public String main(){
		return "index.html";
	}
}
