package com.booktopia.www.service;

import com.booktopia.www.repository.SubscribeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscribeServiceImpl implements SubscribeService{

    private final SubscribeMapper subscribeMapper;
}
