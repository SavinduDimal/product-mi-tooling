package org.wso2.ei.dashboard.micro.integrator.delegates;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
//import org.apache.http.HttpEntity;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.util.EntityUtils;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.json.JSONArray;
//import org.wso2.ei.dashboard.core.commons.Constants;
import org.wso2.ei.dashboard.core.commons.utils.HttpUtils;
import org.wso2.ei.dashboard.core.commons.utils.ManagementApiUtils;
import org.wso2.ei.dashboard.core.db.manager.DatabaseManager;
import org.wso2.ei.dashboard.core.db.manager.DatabaseManagerFactory;
import org.wso2.ei.dashboard.core.exception.ManagementApiException;
//import org.wso2.ei.dashboard.core.rest.delegates.ArtifactDelegate;


//import org.wso2.ei.dashboard.core.rest.model.Ack;
//import org.wso2.ei.dashboard.core.rest.model.ArtifactUpdateRequest;
//import org.wso2.ei.dashboard.core.rest.model.Artifacts;
import org.wso2.ei.dashboard.core.rest.model.NodeList;
import org.wso2.ei.dashboard.core.rest.model.RegistryArtifacts;
import org.wso2.ei.dashboard.core.rest.model.RegistryArtifactsInner;
import org.wso2.ei.dashboard.core.rest.model.RegistryProperty;
//import org.wso2.ei.dashboard.micro.integrator.commons.DelegatesUtil;
import org.wso2.ei.dashboard.micro.integrator.commons.Utils;

//import java.io.IOException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
//import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Delegate class to handle requests from registry resources page.
 */
public class RegistryResourceDelegate {
    private static final Logger logger = LogManager.getLogger(RegistryResourceDelegate.class);

    private final DatabaseManager databaseManager = DatabaseManagerFactory.getDbManager();


    public JsonArray getRegistryInPath(String groupId, String filePath) throws ManagementApiException {
        NodeList nodeList = databaseManager.fetchNodes(groupId);
        // assumption - In a group, all nodes use a shared registry directory
        String nodeId = nodeList.get(0).getNodeId();
        String mgtApiUrl = ManagementApiUtils.getMgtApiUrl(groupId, nodeId);
        String url = mgtApiUrl.concat("registry-resources?registryPath=").concat(filePath).concat("&expand=false");
        String accessToken = databaseManager.getAccessToken(groupId, nodeId);
        CloseableHttpResponse httpResponse = Utils.doGet(groupId, nodeId, accessToken, url);
        JsonArray childNodes = HttpUtils.getJsonResponse(httpResponse).getAsJsonArray("list");

        return childNodes;
    }

    public RegistryArtifacts getRegistryList(String groupId, String filePath)
    throws ManagementApiException {
        logger.debug("Fetching logs via management api.");
        RegistryArtifacts registryList = new RegistryArtifacts();
        JsonArray registryArray = getRegistryInPath(groupId, filePath);
        for (JsonElement jsonElement : registryArray) {
            JsonObject registryObject = jsonElement.getAsJsonObject();
            String childName = registryObject.get("childName").getAsString();
            String mediaType = registryObject.get("mediaType").getAsString();
            JsonArray propertiesJson = registryObject.get("properties").getAsJsonArray();
            List<RegistryProperty> properties = new ArrayList<>();
            for (JsonElement propertyElement : propertiesJson) {
                RegistryProperty registryProperty = new RegistryProperty();
                JsonObject propertyObject = propertyElement.getAsJsonObject();
                String propertyName = propertyObject.get("propertyName").getAsString();
                String propertyValue = propertyObject.get("propertyValue").getAsString();
                registryProperty.setPropertyName(propertyName);
                registryProperty.setPropertyValue(propertyValue);
                properties.add(registryProperty);
            }
            RegistryArtifactsInner registryArtifactsInner = new RegistryArtifactsInner();
            registryArtifactsInner.setChildName(childName);
            registryArtifactsInner.setMediaType(mediaType);
            registryArtifactsInner.setProperties(properties);
            registryList.add(registryArtifactsInner);
        }
        return registryList;
    }

    public String getRegistryContent(String groupId, String filePath) throws ManagementApiException {

        NodeList nodeList = databaseManager.fetchNodes(groupId);
        // assumption - In a group, all nodes use a shared registry directory
        String nodeId = nodeList.get(0).getNodeId();
        String mgtApiUrl = ManagementApiUtils.getMgtApiUrl(groupId, nodeId);
        String url = mgtApiUrl.concat("registry-resources?registryPath=").concat(filePath).concat("&type=content");
        String accessToken = databaseManager.getAccessToken(groupId, nodeId);
        CloseableHttpResponse httpResponse = Utils.doGet(groupId, nodeId, accessToken, url);
        HttpEntity responseEntity = httpResponse.getEntity();
        String response = "";
        if (responseEntity != null) {
            try {
                response = EntityUtils.toString(responseEntity);
            } catch (IOException e) {
                logger.error(e.getMessage());
            }

        }
        return response;
    }

    

}
