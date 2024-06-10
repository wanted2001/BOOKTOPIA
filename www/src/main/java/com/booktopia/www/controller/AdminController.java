package com.booktopia.www.controller;

import com.booktopia.www.domain.BooktopiaVO;
import com.booktopia.www.domain.UserVO;
import com.booktopia.www.repository.BookTopiaMapper;
import com.booktopia.www.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("/admin/*")
@RequiredArgsConstructor
public class AdminController {

    private final UserMapper userMapper;
    private final BookTopiaMapper bookTopiaMapper;

    @GetMapping("/adminPage")
    public String adminPage(Model model) {
        // 회원가입 user > DB 에서 가져오기
        List<UserVO> ulist = userMapper.getList();

        // Booktopia test 진행한 user > DB에서 가져오기
        List<BooktopiaVO> btlist = bookTopiaMapper.bTestList();
        log.info(">>>> btlist >>> {}", btlist);

        model.addAttribute("ulist", ulist);
        model.addAttribute("testlist", btlist);
        return "admin/adminPage";
    }

}
