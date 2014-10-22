insert into Reuniao (id, data, version) values (1, CURRENT_DATE, 0);

insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (1, '2014', 'Parlamentar 1', CURRENT_DATE, 'Determina a concess�o de aux�lio alimenta��o aos trabalhadores de empresas prestadoras de servi�os terceirizados, reguladas por Enunciado do Tribunal Superior do Trabalho.', 464139, '6607', 'PL', 'C');
insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (2, '2014', 'Parlamentar 2', CURRENT_DATE, 'Disp�e sobre o armazenamento de botij�es de g�s liquefeito de petr�leo-GLP e d� outras provid�ncias.', 20918, '4491', 'PL', 'C');
insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (3, '2014', 'Parlamentar 3', CURRENT_DATE, 'Criminaliza condutas praticadas contra c�es e gatos, e d� outras provid�ncias.', 529820, '2833', 'PL', 'C');

insert into Reuniao_Proposicao values (1, 1);
insert into Reuniao_Proposicao values (1, 2);
insert into Reuniao_Proposicao values (1, 3);