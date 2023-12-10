<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html"/>
	<xsl:template match="birds">
		<div class="birdBoxes">
			<xsl:for-each select="bird">
				<xsl:sort select="@location"/>
				<xsl:sort select="@name"/>
				<xsl:sort select="@id" data-type="number"/>
				<xsl:call-template name="bird"/>
			</xsl:for-each>
		</div>
	</xsl:template>
	<xsl:template name="bird">
		<p class="birdBox photoLeft" style="display:block;float:left;width:256px;margin: 0 10px;">
			<a href="{@url}" title="{@name}" class="highslide" onclick="return expand.hs(this)">
				<img src="{@url}" title="Click to enlarge" alt="{@name}" style="width:240px;"/>
			</a>
			<br/>
			<xsl:value-of select="concat(@name,' (',format-number(@id,'0000'),')')" />
			<xsl:choose>
				<xsl:when test="@name != ''">
					<xsl:if test="@location != ''">
						<xsl:text>, </xsl:text>
						<xsl:value-of select="@location" />
					</xsl:if>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="@location != ''">
						<xsl:text> </xsl:text>
						<xsl:value-of select="@location" />
					</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</p>
	</xsl:template>
</xsl:stylesheet>