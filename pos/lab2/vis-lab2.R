library(tidyverse)

enade_pb <- read.csv("enade_2017_pb.csv")

enade_pb <- select(enade_pb, CO_CATEGAD, QE_I15, QE_I21) 

vis1 <- enade_pb %>%
        group_by(CO_CATEGAD, QE_I15) %>%
        summarise(contagem = dplyr::n()) %>% 
        mutate(percentual = contagem / sum(contagem))
vis1
