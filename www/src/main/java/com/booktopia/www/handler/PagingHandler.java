package com.booktopia.www.handler;

import com.booktopia.www.domain.*;
import com.booktopia.www.domain.DTO.CommentDTO;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import lombok.*;

import java.util.List;
class ListType<T> {

}

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PagingHandler {
    private int startPage;
    private int endPage;
    private boolean prev,next;
    private int totalCount;
    private PagingVO pgvo;

    private List<BoardVO> boardlist;
    private List<DeliveryVO> deliveries;
    private List<OrderInfoDTO> orderInfoDTOList;
    private List<BooktopiaVO> booktopia;
    private List<UserVO> userList;
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
