package com.booktopia.www.controller;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.DTO.BoardDTO;
import com.booktopia.www.domain.FileVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.handler.FileHandler;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.service.BoardService;
import com.booktopia.www.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequestMapping("/community/*")
@Controller
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService csv;
    private final BoardService bsv;
    private final FileHandler fh;

    @GetMapping("/communityMain")
    public void commMain(){}

    @GetMapping("/communityList")
    public void commList(Model m, PagingVO pgvo){
        log.info("pgvo>>>>{}",pgvo);
        //전체 게시글 수
        int totalCount = bsv.getTotalCount(pgvo);

        PagingHandler ph = new PagingHandler(pgvo,totalCount);
        log.info("ph>>>>>{}",ph);

        List<BoardVO> blist = bsv.getList(pgvo);
        log.info("blist>>>{}", blist);

        m.addAttribute("blist",blist);
        m.addAttribute("ph",ph);
    }

    @GetMapping("/communityDetail")
    public void commDetail(){}

    @GetMapping("/communityNotice")
    public void commNotice(){}

//    @PostMapping("/register")
//    @ResponseBody
//    public String register(BoardVO bvo, @RequestParam(name="files", required = false) MultipartFile[] files){
//        List<FileVO> flist = null;
//
//        log.info("files>>>{}",files);
//        if(files[0].getSize()>0){
//            flist=fh.uploadFiles(files);
//        }
//
//        log.info("flist >>>{}",flist);
//        log.info("bvo>>{}",bvo);
//
//        BoardDTO bdto = new BoardDTO(bvo, flist);
//        log.info("bdto>>{}",bdto);
//
//        int isOk = bsv.insert(bdto);
//        return isOk>0? "1":"0";
//    }

//    @PostMapping("/fileRegister")
//    @ResponseBody
//    public ResponseEntity<String> fileUpload(@RequestParam("image") MultipartFile image){
//        if(image.isEmpty()){
//            log.error("File 없음");
//            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
//        }
//
//        List<FileVO> flist = fh.uploadFiles(new MultipartFile[]{image});
//        log.info("flist >>>{}",flist);
//        if(flist.isEmpty()){
//            log.error("file 업로드 실패");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
//        }
//
//        String imageUrl = flist.get(0).getSaveDir()+"/"+flist.get(0).getUuid()+"_"+flist.get(0).getFileName();
//        log.info("파일 업로드 성공>>{}",imageUrl);
//        return ResponseEntity.ok(imageUrl);
//    }
}
