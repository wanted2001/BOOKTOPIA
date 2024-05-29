package com.booktopia.www.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class KakaoPayVO {
    private String tid, next_redirect_pc_url;
    private Date created_at;
}
