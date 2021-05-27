CREATE TABLE IF NOT EXISTS locations(
    l_name varchar(50) NOT NULL,
    region varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    lat int NOT NULL,
    lon int NOT NULL,
    tz_id varchar(50) NOT NULL,
    localtime_epoch int NOT NULL,
    localtime int NOT NULL

)

INSERT OR IGNORE INTO locations(l_name, region, country, lat, lon, tz_id, localtime_epoch, localtime) VALUES ('Facultad de Ciencias Fisico Matematicas', 'Monterrey', 'Mexico', 25.7255693, -100.3173777, '.', 1, 0522);
