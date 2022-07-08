package org.wso2.ei.dashboard.core.rest.model;

import java.util.ArrayList;
import java.util.List;
import org.wso2.ei.dashboard.core.rest.model.RegistryProperty;
import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;


public class RegistryArtifactsInner   {
  private @Valid String childName = null;
  private @Valid String mediaType = null;
  private @Valid List<RegistryProperty> properties = new ArrayList<RegistryProperty>();

  /**
   **/
  public RegistryArtifactsInner childName(String childName) {
    this.childName = childName;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("childName")

  public String getChildName() {
    return childName;
  }
  public void setChildName(String childName) {
    this.childName = childName;
  }

  /**
   **/
  public RegistryArtifactsInner mediaType(String mediaType) {
    this.mediaType = mediaType;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("mediaType")

  public String getMediaType() {
    return mediaType;
  }
  public void setMediaType(String mediaType) {
    this.mediaType = mediaType;
  }

  /**
   **/
  public RegistryArtifactsInner properties(List<RegistryProperty> properties) {
    this.properties = properties;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("properties")

  public List<RegistryProperty> getProperties() {
    return properties;
  }
  public void setProperties(List<RegistryProperty> properties) {
    this.properties = properties;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RegistryArtifactsInner registryArtifactsInner = (RegistryArtifactsInner) o;
    return Objects.equals(childName, registryArtifactsInner.childName) &&
        Objects.equals(mediaType, registryArtifactsInner.mediaType) &&
        Objects.equals(properties, registryArtifactsInner.properties);
  }

  @Override
  public int hashCode() {
    return Objects.hash(childName, mediaType, properties);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RegistryArtifactsInner {\n");
    
    sb.append("    childName: ").append(toIndentedString(childName)).append("\n");
    sb.append("    mediaType: ").append(toIndentedString(mediaType)).append("\n");
    sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
