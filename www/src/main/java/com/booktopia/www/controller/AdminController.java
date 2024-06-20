package com.booktopia.www.controller;

import com.booktopia.www.domain.*;
import com.booktopia.www.domain.DTO.CommentDTO;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.repository.*;
import com.booktopia.www.service.*;
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
    private final HeartMapper heartMapper;
    private final AdCouponMapper adCouponMapper;
    private final QnaMapper qnaMapper;

    private final AdCouponService adCouponService;

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
        PagingVO pgvo = new PagingVO(pageNo,10);
        int tatalCount = userMapper.getTotal();

        PagingHandler ph = new PagingHandler(pgvo, tatalCount);
        List<UserVO> ulist = userMapper.adminUserList(pgvo);
        ph.setUserList(ulist);

        return ph;
    }

    // 취향검사 리스트 요청
    @GetMapping("/testList/{pageNo}")
    @ResponseBody
    public PagingHandler getTestList(@PathVariable("pageNo") int pageNo) {
        PagingVO pgvo = new PagingVO(pageNo, 10);
        int testTotal = bookTopiaMapper.getTotal();

        PagingHandler booktestph = new PagingHandler(pgvo, testTotal);
        booktestph.setBooktopia(bookTopiaMapper.adminTestList(pgvo));
        return booktestph;
    }

    // 구독자 리스트 요청(결제)
    @GetMapping("/subUser/{pageNo}")
    @ResponseBody
    public PagingHandler getSubUser(@PathVariable("pageNo") int pageNo) {
        PagingVO subPgvo = new PagingVO(pageNo, 10);
        int subTotal = payMapper.getTotal();

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
        return subPh;
    }

    // delivery 리스트 요청
    @GetMapping("/delivery/{pageNo}")
    @ResponseBody
    public PagingHandler getDelivery(@PathVariable("pageNo") int pageNo) {
        PagingVO deliPgvo = new PagingVO(pageNo, 10);
        int deliTotal = deliMapeer.getTotal();

        PagingHandler deliPh = new PagingHandler(deliPgvo, deliTotal);
        deliPh.setDeliveries(deliMapeer.adminDelList(deliPgvo));
        return deliPh;
    }

    // board 리스트 요청
    @GetMapping("/boardList/{pageNo}")
    @ResponseBody
    public PagingHandler getBoardList(@PathVariable("pageNo") int pageNo){
        PagingVO boardPgvo = new PagingVO(pageNo, 10);
        int boardCount = boardMapper.getCount();

        PagingHandler boardPh = new PagingHandler(boardPgvo, boardCount);
        boardPh.setBoardlist(boardMapper.adminBoardList(boardPgvo));

        return boardPh;
    }

    // 댓글 리스트 요청
    @GetMapping("/admincommentList/{pageNo}")
    @ResponseBody
    public PagingHandler adminGetcommentList(@PathVariable("pageNo") int pageNo){
        PagingVO commenPagingVO = new PagingVO(pageNo, 10);
        int commentCount = commentMapper.getCount();
        int recommentCoount = reCommentMapper.getreCommentCount();
        int tatolCount = commentCount+recommentCoount;

        List<CommentDTO> recmolist = reCommentMapper.adminreCommtneList();

        PagingHandler commenPh = new PagingHandler(commenPagingVO, tatolCount, recmolist);
        commenPh.setCmtList(commentMapper.admingetCommentList(commenPagingVO));

        return commenPh;
    }

    // 쿠론 리스트 요청
    @GetMapping("/adminCoupon/{pageNo}")
    @ResponseBody
    public PagingHandler adminCouponList(@PathVariable("pageNo") int pageNo){
        PagingVO couponPvo = new PagingVO(pageNo, 10);
        int couponCount = adCouponMapper.getCount();

        PagingHandler couponPh = new PagingHandler(couponPvo, couponCount);
        couponPh.setAdCouponList(adCouponMapper.getList(couponPvo));

        return couponPh;
    }

    // 쿠폰 생성 구문
    @PostMapping("/addCoupon")
    @ResponseBody
    public String addCoupon(@RequestBody AdCouponVO adcoupon){
        int isOk = adCouponService.insert(adcoupon);
        log.info("isOk >>> {}", isOk);
        return isOk > 0 ? "1":"0";
    }

    // 문의글 리스트 요청
    @GetMapping("/adminQnaList/{pageNo}")
    @ResponseBody
    public String adminQnaList(@PathVariable("pageNo") int pageNo){
        log.info("controller in >>> ");
        PagingVO qnaPgvo = new PagingVO(pageNo, 10);
        int qnaCount = qnaMapper.qnaCount();
        log.info("qnaCount >>>> {}", qnaCount);

        PagingHandler qnaPh = new PagingHandler(qnaPgvo, qnaCount);
        qnaPh.setQnlList(qnaMapper.getList(qnaPgvo));

        log.info("qnaPh >>> {}", qnaPh);
        return "1";
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

        // 댓글, 대댓글, 하트가 있을 경우
        int recomCount = reCommentMapper.getadreComCount(bno);
        int comCount = commentMapper.getadComCount(bno);
        int heartCount = heartMapper.getcount(bno);

        if(recomCount > 0 || comCount > 0 || heartCount > 0) {
            reCommentMapper.adminDelRecomment(bno);
            commentMapper.deleteCommentFromBoard(bno);
            heartMapper.adminDelHeart(bno);
        }
        boardMapper.adminDelBoard(bno);
        return "1";
    }

    // 댓글 삭제 구문
    @DeleteMapping ("/commentDel/{bno}")
    @ResponseBody
    public String commentDel (@PathVariable("bno") long bno){
        log.info("comment controller in >>>> ");

        int recomCount = reCommentMapper.getadreComCount(bno);
        if(recomCount > 0){
            reCommentMapper.adminDelRecomment(bno);
        }
        commentMapper.deleteCommentFromBoard(bno);
        return "1";
    }

}
