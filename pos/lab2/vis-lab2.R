library(tidyverse)

enade_pb <- read.csv("enade_2017_pb.csv")

enade_pb <- select(enade_pb, CO_CATEGAD, QE_I15, QE_I21) 

dist_cotas <- enade_pb %>%
        group_by(CO_CATEGAD, QE_I15) %>%
        summarise(contagem = dplyr::n()) %>% 
        mutate(percentual = contagem / sum(contagem)) %>%
        filter(QE_I15 ==  'A') %>%
        mutate(sem_conta = percentual, com_cota = 1-percentual) %>%
        select(CO_CATEGAD, com_cota, sem_conta)

sem_cota <- enade_pb %>% filter(QE_I15 == 'A') %>%
        group_by(CO_CATEGAD, QE_I21) %>%
        summarise(contagem = dplyr::n()) %>% 
        mutate(percentual = contagem / sum(contagem)) %>%
        filter(QE_I21 == "A") %>% 
        mutate(sem_cota_fam_grad = percentual, sem_cota_sem_fam_grad = 1- percentual) %>%
        select(CO_CATEGAD, sem_cota_fam_grad, sem_cota_sem_fam_grad)

com_cota <- enade_pb %>% filter(QE_I15 != 'A') %>%
            group_by(CO_CATEGAD, QE_I21) %>%
            summarise(contagem = dplyr::n()) %>% 
            mutate(percentual = contagem / sum(contagem)) %>%
            filter(QE_I21 == "A") %>% 
            mutate(cota_fam_grad = percentual, cota_sem_fam_grad = 1- percentual) %>%
            select(CO_CATEGAD, cota_fam_grad, cota_sem_fam_grad)

dist_fam_grad <- merge(sem_cota, com_cota)
