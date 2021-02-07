CREATE TABLE IF NOT EXISTS HEARTBEAT(
    GROUP_ID VARCHAR (255),
    NODE_ID VARCHAR (255),
    HERTBEAT_INTERVAL INTEGER,
    MGT_API_URL VARCHAR (255),
    TIMESTAMP TIMESTAMP,
    PRIMARY KEY (GROUP_ID, NODE_ID)
);

CREATE TABLE IF NOT EXISTS SERVERS(
    GROUP_ID VARCHAR (255),
    NODE_ID VARCHAR (255),
    DETAILS VARCHAR (5000),
    PRIMARY KEY (GROUP_ID, NODE_ID)
);

CREATE TABLE IF NOT EXISTS PROXY_SERVICES(
    GROUP_ID VARCHAR (255),
    NODE_ID VARCHAR (255),
    NAME VARCHAR (255),
    DETAILS VARCHAR (5000),
    PRIMARY KEY (GROUP_ID, NODE_ID, NAME)
);

CREATE TABLE IF NOT EXISTS ENDPOINTS(
    GROUP_ID VARCHAR (255),
    NODE_ID VARCHAR (255),
    NAME VARCHAR (255),
    DETAILS VARCHAR (5000),
    PRIMARY KEY (GROUP_ID, NODE_ID, NAME)
);

CREATE TABLE IF NOT EXISTS APIS(
    GROUP_ID VARCHAR (255),
    NODE_ID VARCHAR (255),
    NAME VARCHAR (255),
    DETAILS VARCHAR (5000),
    PRIMARY KEY (GROUP_ID, NODE_ID, NAME)
);
