package com.booktopia.www.controller;

import com.booktopia.www.domain.*;
import com.booktopia.www.domain.DTO.CommentDTO;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.repository.*;
import com.booktopia.www.service.BoardService;
import com.booktopia.www.service.BoardServiceImpl;
import com.booktopia.www.service.CommentService;
import com.booktopia.www.service.ReCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Entity;
import retrofit2.http.DELETE;
import retrofit2.http.PATCH;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/admin/*")
@RequiredArgsConstructor
public class AdminController {

    private final UserMapper userMapper;
    private final BookTopiaMapper bookTopiaMapper;
    private final OrderInfoMapper orderInfoMapper;
    private final PayMapper payMapper;
    private final DeliMapeer deliMapeer;
    private final BoardMapper boardMapper;
    private final CommentMapper commentMapper;
    private final ReCommentMapper reCommentMapper;

    private final BoardService boardService;
    private final CommentService commentService;
    private final ReCommentService reCommentService;

    // 해당 리스트에 총 갯수
    // 전체 리스트
    @GetMapping("/adminPage")
    public void adminPage() {}
//    @GetMapping("/adminPage")
//    public String adminPage(Model model) {
//        // 회원가입 user > DB 에서 가져오기
//        List<UserVO> ulist = userMapper.getList();
//
////        int totalCount = bsv.getTotalCount(pgvo);
//
//        // Booktopia test 진행한 user > DB에서 가져오기
//        List<BooktopiaVO> btlist = bookTopiaMapper.bTestList();
//
//        // 구독자 리스트 pay, order_info >> DB에서 가져와 OrderInfoDTO에 담기
//        List<OrderInfoVO> ordlist = orderInfoMapper.orderList();
//        List<PayVO> paylist = payMapper.payList();
//        List<OrderInfoDTO> odtolist = new ArrayList<>();
//
//        for(int i=0;i<ordlist.size();i++){
//            OrderInfoVO orderInfo = ordlist.get(i);
//            PayVO payInfo = paylist.get(i);
//
//            OrderInfoDTO dto = new OrderInfoDTO();
//            dto.setMerchantUid(orderInfo.getMerchantUid());
//            dto.setOrdName(orderInfo.getOrdName());
//            dto.setOrdPhone(orderInfo.getOrdPhone());
//            dto.setOrdAddr(orderInfo.getOrdAddr());
//            dto.setItemName(payInfo.getItemName());
//            dto.setTotalAmount(payInfo.getTotalAmount());
//
//            odtolist.add(dto);
//        }
//
//        // 배송 현황 리스트 가져오기
//        List<DeliveryVO> delilist = deliMapeer.getList();
//        log.info(">>> delilist >>> {}", delilist);
//
//        // board 리스트 DB에서 가져오기
//        List<BoardVO> boadlist = boardMapper.getboarList();
//
//        log.info(">>> boadlist >>> {}", boadlist);
//
//        // comment 리스트 DB에서 가져오기
//        List<CommentVO> commlist = commentMapper.getComList();
//        log.info(">>> commlist >>> {}", commlist);
//
//        model.addAttribute("ulist", ulist);
//        model.addAttribute("testlist", btlist);
//        model.addAttribute("odtolist", odtolist);
//        model.addAttribute("delilist", delilist);
//        model.addAttribute("boadlist", boadlist);
//        model.addAttribute("commlist",commlist);
//
//        return "/admin/adminPage";
//    }

    // 회원리스트 요청
    @GetMapping("/getUserList/{pageNo}")
    @ResponseBody
    public PagingHandler getUserList(@PathVariable("pageNo") int pageNo) {
        PagingVO pgvo = new PagingVO(pageNo, 10);
        int tatalCount = userMapper.getTotal();
        log.info("tatalCount >>> {}", tatalCount);
//        userMapper.getList();
        PagingHandler ph = new PagingHandler(pgvo, tatalCount);
        ph.setUserList(userMapper.adminUserList(pgvo));
        log.info("ph >>> {}", ph);
        return ph;
    }

    // 취향검사 리스트 요청
    @GetMapping("/testList/{pageNo}")
    @ResponseBody
    public PagingHandler getTestList(@PathVariable("pageNo") int pageNo) {
        PagingVO pgvo = new PagingVO(pageNo, 10);
        int testTotal = bookTopiaMapper.getTotal();
        log.info("testTotal >>> {}", testTotal);

        PagingHandler booktestph = new PagingHandler(pgvo, testTotal);
        booktestph.setBooktopia(bookTopiaMapper.adminTestList(pgvo));
        log.info("booktestph >>> {}", booktestph);
        return booktestph;
    }

    // 구독자 리스트 요청(결제)
    @GetMapping("/subUser/{pageNo}")
    @ResponseBody
    public PagingHandler getSubUser(@PathVariable("pageNo") int pageNo) {
        PagingVO subPgvo = new PagingVO(pageNo, 10);
        int subTotal = payMapper.getTotal();
        log.info("subTotal >>> {}", subTotal);

        List<OrderInfoVO> ordlist = orderInfoMapper.orderList();
        List<PayVO> paylist = payMapper.payList();
        List<OrderInfoDTO> odtolist = new ArrayList<>();

        for(int i=0;i<ordlist.size();i++){
            OrderInfoVO orderInfo = ordlist.get(i);
            PayVO payInfo = paylist.get(i);

            OrderInfoDTO dto = new OrderInfoDTO();
            dto.setMerchantUid(orderInfo.getMerchantUid());
            dto.setOrdName(orderInfo.getOrdName());
            dto.setOrdPhone(orderInfo.getOrdPhone());
            dto.setOrdAddr(orderInfo.getOrdAddr());
            dto.setItemName(payInfo.getItemName());
            dto.setTotalAmount(payInfo.getTotalAmount());

            odtolist.add(dto);
        }
        PagingHandler subPh = new PagingHandler(subPgvo, subTotal);
        subPh.setOrderInfoDTOList(odtolist);
        log.info("subPh >>> {}", subPh);
        return subPh;
    }

    // delivery 리스트 요청
    @GetMapping("/delivery/{pageNo}")
    @ResponseBody
    public PagingHandler getDelivery(@PathVariable("pageNo") int pageNo) {
        PagingVO deliPgvo = new PagingVO(pageNo, 10);
        int deliTotal = deliMapeer.getTotal();
        log.info("deliTotal >>> {}", deliTotal);

        PagingHandler deliPh = new PagingHandler(deliPgvo, deliTotal);
        deliPh.setDeliveries(deliMapeer.adminDelList(deliPgvo));
        log.info("deliPh >>> {}", deliPh);
        return deliPh;
    }

    // board 리스트 요청
    @GetMapping("/boardList/{pageNo}")
    @ResponseBody
    public PagingHandler getBoardList(@PathVariable("pageNo") int pageNo){
        PagingVO boardPgvo = new PagingVO(pageNo, 10);
        int boardCount = boardMapper.getCount();
        log.info("boadCount >>> {}", boardCount);

        PagingHandler boardPh = new PagingHandler(boardPgvo, boardCount);
        boardPh.setBoardlist(boardMapper.adminBoardList(boardPgvo));
        log.info("boardPh >>> {}", boardPh);

        return boardPh;
    }

    // 댓글 리스트 요청
    @GetMapping("admincommentList/{pageNo}")
    @ResponseBody
    public PagingHandler adminGetcommentList(@PathVariable("pageNo") int pageNo){
        PagingVO commenPagingVO = new PagingVO(pageNo, 10);
        int commentCount = commentMapper.getCount();
        int recommentCoount = reCommentMapper.getreCommentCount();
        int tatolCount = commentCount+recommentCoount;
        log.info("tatolCount >>> {}", tatolCount);

        List<CommentDTO> recmolist = reCommentMapper.adminreCommtneList();
        log.info("recmolist >>> {}", recmolist);

        PagingHandler commenPh = new PagingHandler(commenPagingVO, tatolCount, recmolist);
        log.info("commenPh >>> {}", commenPh);
        commenPh.setCmtList(commentMapper.admingetCommentList(commenPagingVO));
//        commenPh.setCmtList(reCommentMapper.adminreCommtneList(commenPagingVO));
        log.info("commenPh >>> {}", commenPh);

        return commenPh;
    }

    //배송현황 구문 (배송준비중 > 결제승인/배송)
    @PostMapping("/deliUid")
    @ResponseBody
    public String delistatus(@RequestBody String deliUid) {
        log.info("status: {}", deliUid);
        deliMapeer.updateStaus(deliUid);
        return "1";
    }

    //배송현황 구문 (결제승인/배송 > 결제완료)
    @PostMapping("/secondStatus")
    @ResponseBody
    public String secondStatus(@RequestBody String deliUid) {
        log.info("status secont >> : {}", deliUid);
        deliMapeer.updateScondStaus(deliUid);
        return "1";
    }

    // 게시글 삭제 구문
    @DeleteMapping ("/boardDel/{bno}")
    @ResponseBody
    public String boardDel(@PathVariable("bno") long bno) {
        log.info("board controller in >>>> ");
//        commentMapper.deleteCommentFromBoard(bno);
//        int isOk = boardMapper.bnoDel(bno);

        int isOk = boardService.delete(bno);
        reCommentService.deleteCommentFromBoard(bno);
        return isOk > 0 ? "1" : "0";

    }

    // 댓글 삭제 구문
    @DeleteMapping ("/commentDel/{bno}")
    @ResponseBody
    public String commentDel (@PathVariable("bno") long bno){
        log.info("comment controller in >>>> ");
        commentMapper.deleteCommentFromBoard(bno);
        return "1";
    }

}
