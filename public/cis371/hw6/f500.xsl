<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
  	<link rel="stylesheet" href="" type="text/css"/>
  </head>
  <body>
    <h2>Fortune 500 companies</h2>
    <table border="1">
		<tr class="heading">
		  <th align="right">Rank</th>
		  <th align="left">Company</th>
		  <th align="left">Revenue</th>
		</tr>
		<xsl:for-each select="companies/companyA">
			<tr>
			  <td align="right">
				<xsl:value-of select="Rank"/>
			  </td>
			  <td>
			  	<xsl:value-of select="Company"/>
			  </td>
			  <td>
			  	<xsl:value-of select="Revenue"/>
			  </td>
			</tr>
		</xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>