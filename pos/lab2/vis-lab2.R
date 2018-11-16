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

dados <- merge(dist_cotas, dist_grad) %>%
         mutate(percentual_grad = percentual_grad*percentual_aluno)
write.csv (dados, file = "dados-lab2-vis-1.csv")

# terceira visualização
moda <- function(x) {
  z <- table(as.vector(x)); names(z)[z == max(z)]
}
dados2 <- read.csv("enade_2017_pb.csv")
dados2 <- select(dados2, CO_CATEGAD, NU_IDADE, NT_GER, QE_I08, QE_I27) %>% na.exclude() %>%
            group_by(CO_CATEGAD) %>%
            summarise(idade = median(NU_IDADE), nota = median(NT_GER), 
                      renda = moda(QE_I08), satisfacao = median(QE_I27))
write.csv (dados2, file = "dados-lab2-vis-3.csv")
