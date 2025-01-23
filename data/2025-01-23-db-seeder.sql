INSERT INTO `books` (`title`, `author`, `abstract`, `image`) VALUES
('Il nome della rosa', 'Umberto Eco', 'Un giallo storico ambientato in un monastero medievale.', 'il_nome_della_rosa.webp'),
('La Divina Commedia', 'Dante Alighieri', 'Capolavoro della letteratura mondiale in tre cantiche.', 'la_divina_commedia.jpg'),
('I Promessi Sposi', 'Alessandro Manzoni', 'Un romanzo storico che racconta la storia di Renzo e Lucia.', 'i_promessi_sposi.jpg'),
('Se questo è un uomo', 'Primo Levi', 'Testimonianza delle esperienze in un campo di concentramento.', 'se_questo_e_un_uomo.jpg'),
('L’isola del tesoro', 'Robert Louis Stevenson', 'Un’avventura tra pirati e tesori nascosti.', 'lisola_del_tesoro.jpg'),
('Il Gattopardo', 'Giuseppe Tomasi di Lampedusa', 'Una narrazione sulla Sicilia e il cambiamento sociale.', 'il_gattopardo.jpg'),
('Pinocchio', 'Carlo Collodi', 'Le avventure di un burattino che vuole diventare un bambino vero.', 'pinocchio.jpg'),
('Cuore', 'Edmondo De Amicis', 'Racconto di formazione ambientato nell’Italia unita.', 'cuore.jpg'),
('La solitudine dei numeri primi', 'Paolo Giordano', 'Un racconto di sofferenza e connessione.', 'la_solitudine_dei_numeri_primi.jpg'),
('Il barone rampante', 'Italo Calvino', 'La storia di un nobile che vive sugli alberi.', 'il_barone_rampante.jpg');

-- Recensioni per "Il nome della rosa"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(1, 'Giulia', 5, 'Un capolavoro assoluto, ricco di dettagli e riflessioni.'),
(1, 'Luca', 4, 'Un po’ complesso ma affascinante.'),
(1, 'Marco', 5, 'Un mix perfetto di mistero e filosofia.');

-- Recensioni per "La Divina Commedia"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(2, 'Alice', 5, 'Un viaggio straordinario attraverso l’inferno, il purgatorio e il paradiso.'),
(2, 'Simone', 4, 'Non semplice da leggere, ma assolutamente unico.');

-- Recensioni per "I Promessi Sposi"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(3, 'Maria', 5, 'Una lettura obbligatoria, incredibilmente attuale.'),
(3, 'Federico', 3, 'Interessante, ma non il mio genere preferito.');

-- Recensioni per "Se questo è un uomo"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(4, 'Elena', 5, 'Un libro che tutti dovrebbero leggere per non dimenticare.'),
(4, 'Matteo', 5, 'Emozionante e commovente.');

-- Recensioni per "L’isola del tesoro"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(5, 'Antonio', 4, 'Un classico che non perde il suo fascino.'),
(5, 'Carla', 3, 'Buon libro, ma non mi ha coinvolto molto.');

-- Recensioni per "Il Gattopardo"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(6, 'Giorgia', 5, 'Un ritratto meraviglioso della Sicilia e del cambiamento sociale.');

-- Recensioni per "Pinocchio"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(7, 'Gianni', 5, 'Un libro per tutte le età, ricco di insegnamenti.');

-- Recensioni per "Cuore"
-- Nessuna recensione.

-- Recensioni per "La solitudine dei numeri primi"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(9, 'Claudia', 4, 'Un romanzo delicato e intenso.');

-- Recensioni per "Il barone rampante"
INSERT INTO `reviews` (`book_id`, `name`, `vote`, `text`) VALUES
(10, 'Davide', 5, 'Un libro originale e divertente.'),
(10, 'Francesca', 4, 'Bellissimo, ma un po’ lento in alcune parti.');
