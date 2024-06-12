package com.booktopia.www.handler;

import com.booktopia.www.domain.CommentVO;
import com.booktopia.www.domain.DTO.CommentDTO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class PagingHandler {
    private int startPage;
    private int endPage;
    private boolean prev,next;
    private int totalCount;
    private PagingVO pgvo;
    private List<CommentDTO> cmtList;

    public PagingHandler(PagingVO pgvo, int totalCount) {
        this.pgvo=pgvo;
        this.totalCount = totalCount;

        this.endPage= (int) (Math.ceil(pgvo.getPageNo()/(double)10)*10);
        this.startPage = endPage-9;

        int realEndPage = (int) Math.ceil(totalCount/(double)pgvo.getQty());

        if(realEndPage<endPage) {
            this.endPage=realEndPage;
        }

        this.prev=this.startPage>1;
        this.next=this.endPage<realEndPage;
    }

    public PagingHandler(PagingVO pgvo, int totalCount, List<CommentDTO> cmtList){
        this(pgvo,totalCount);
        this.cmtList=cmtList;

    }
}
