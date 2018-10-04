library(tidyverse)

authors <- read.csv("authors.csv")
papers <- read.csv("papers.csv")
conferences <- read.csv("conferences.csv")
ethnicity <- read.csv("ethnicity.csv")

pub_year <- papers %>% select(paper_key, conf_key) %>% group_by(paper_key) %>% merge(conferences) %>% 
          select(year) %>% group_by(year) %>% count()

conf_year <- papers %>% select(paper_key, conf_key) %>% group_by(paper_key) %>% merge(conferences) %>% 
  select(global_key) %>% group_by(global_key) %>% count() %>% ungroup() %>% top_n(10)

author_pub <- authors %>% select(name_author) %>% group_by(name_author) %>% count() %>% ungroup() %>% top_n(10)

write.csv (pub_year, file = "pub_year.csv")
write.csv (conf_year, file = "conf_year.csv")
write.csv (author_pub, file = "author_pub.csv")
