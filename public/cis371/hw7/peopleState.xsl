<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<table border="1">
	<tr class="heading">
	  <th align="right">Rank</th>
	  <th align="left">Company</th>
	  <th align="left">Revenue</th>
	</tr>
	<xsl:for-each select="people/person">
		<tr>
		  <td align="right">
			<xsl:value-of select="firstName"/>
		  </td>
		  <td align="right">
			<xsl:value-of select="lastName"/>
		  </td>
		  <td align="right">
			<xsl:value-of select="address"/>
		  </td>
		  <td align="right">
			<xsl:value-of select="phone"/>
		  </td>
		</tr>
	</xsl:for-each>
</table>