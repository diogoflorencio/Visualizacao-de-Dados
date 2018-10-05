library(tidyverse)

authors <- read.csv("authors.csv")
papers <- read.csv("papers.csv")
conferences <- read.csv("conferences.csv")
ethnicity <- read.csv("ethnicity.csv")

pub_gender <- merge(papers, authors) %>% merge(ethnicity) %>%
       select(global_key, gender) %>% 
       filter(gender %in% c("M", "F")) %>% 
       group_by(global_key, gender) %>% count(gender) %>% summarise(qtd = n)

pub_time <- merge(authors, papers) %>% select(name_author, conf_key) %>%
            merge(conferences) %>% select(name_author, year) %>%
            merge(ethnicity) %>% select(gender, year)  %>% 
            filter(gender %in% c("M", "F")) %>% 
            group_by(year, gender) %>% count(gender) %>% summarise(qtd = n)

write.csv (pub_gender, file = "pub_gender.csv")
write.csv (pub_time, file = "pub_time.csv")
