package org.wso2.ei.dashboard.core.rest.model;

import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;


public class RegistryProperty   {
  private @Valid String propertyName = null;
  private @Valid String propertyValue = null;

  /**
   **/
  public RegistryProperty propertyName(String propertyName) {
    this.propertyName = propertyName;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("propertyName")

  public String getPropertyName() {
    return propertyName;
  }
  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
  }

  /**
   **/
  public RegistryProperty propertyValue(String propertyValue) {
    this.propertyValue = propertyValue;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("propertyValue")

  public String getPropertyValue() {
    return propertyValue;
  }
  public void setPropertyValue(String propertyValue) {
    this.propertyValue = propertyValue;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RegistryProperty registryProperty = (RegistryProperty) o;
    return Objects.equals(propertyName, registryProperty.propertyName) &&
        Objects.equals(propertyValue, registryProperty.propertyValue);
  }

  @Override
  public int hashCode() {
    return Objects.hash(propertyName, propertyValue);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RegistryProperty {\n");
    
    sb.append("    propertyName: ").append(toIndentedString(propertyName)).append("\n");
    sb.append("    propertyValue: ").append(toIndentedString(propertyValue)).append("\n");
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
