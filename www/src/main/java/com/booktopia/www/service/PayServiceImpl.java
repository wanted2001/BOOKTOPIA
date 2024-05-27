package com.booktopia.www.service;

import com.booktopia.www.repository.PayMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    private final PayMapper payMapper;
}
