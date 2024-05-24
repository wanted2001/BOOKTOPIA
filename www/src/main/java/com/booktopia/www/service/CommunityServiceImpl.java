package com.booktopia.www.service;

import com.booktopia.www.repository.CommunityMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class CommunityServiceImpl implements CommunityService{

    private final CommunityMapper communitymapper;
}
