library(tidyverse)

enade_pb <- read.csv("enade_2017_pb.csv")

enade_pb <- select(enade_pb, CO_CATEGAD, QE_I15, QE_I21) %>% filter(QE_I15 != 'NA')

enade_pb$QE_I15 <- as.character(enade_pb$QE_I15)
enade_pb$QE_I15[enade_pb$QE_I15 == "A"] <- "Sem cota"
enade_pb$QE_I15[enade_pb$QE_I15 != "Sem cota"] <- "Com cota"

dist_cotas <- enade_pb %>%
        group_by(CO_CATEGAD, QE_I15) %>%
        summarise(contagem = dplyr::n()) %>% 
        mutate(percentual_aluno = contagem / sum(contagem)) %>%
        select(CO_CATEGAD, QE_I15, percentual_aluno)

dist_grad <- enade_pb %>% 
        group_by(CO_CATEGAD, QE_I15, QE_I21) %>%
        summarise(contagem = dplyr::n()) %>% 
        mutate(percentual_grad = contagem / sum(contagem)) %>%
        filter(QE_I21 == "A") %>%
        select(CO_CATEGAD, QE_I15, percentual_grad)

dados <- merge(dist_cotas, dist_grad)    
write.csv (dados, file = "dados-lab2-vis-1.csv")
