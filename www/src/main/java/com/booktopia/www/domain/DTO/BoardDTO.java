package com.booktopia.www.domain.DTO;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.FileVO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    private BoardVO bvo;
    private List<FileVO> flist;
}
