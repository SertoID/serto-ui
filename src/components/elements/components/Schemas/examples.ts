export const EXAMPLE_SCHEMAS: { [key: string]: string } = {
  VerifiableCredential: `{
  "@context": {
    "@version": 1.1,
    "@protected": true,

    "id": "@id",
    "type": "@type",

    "VerifiableCredential": {
      "@id": "https://www.w3.org/2018/credentials#VerifiableCredential",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "cred": "https://www.w3.org/2018/credentials#",
        "sec": "https://w3id.org/security#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",

        "credentialSchema": {
          "@id": "cred:credentialSchema",
          "@type": "@id",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "cred": "https://www.w3.org/2018/credentials#",

            "JsonSchemaValidator2018": "cred:JsonSchemaValidator2018"
          }
        },
        "credentialStatus": {"@id": "cred:credentialStatus", "@type": "@id"},
        "credentialSubject": {"@id": "cred:credentialSubject", "@type": "@id"},
        "evidence": {"@id": "cred:evidence", "@type": "@id"},
        "expirationDate": {"@id": "cred:expirationDate", "@type": "xsd:dateTime"},
        "holder": {"@id": "cred:holder", "@type": "@id"},
        "issued": {"@id": "cred:issued", "@type": "xsd:dateTime"},
        "issuer": {"@id": "cred:issuer", "@type": "@id"},
        "issuanceDate": {"@id": "cred:issuanceDate", "@type": "xsd:dateTime"},
        "proof": {"@id": "sec:proof", "@type": "@id", "@container": "@graph"},
        "refreshService": {
          "@id": "cred:refreshService",
          "@type": "@id",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "cred": "https://www.w3.org/2018/credentials#",

            "ManualRefreshService2018": "cred:ManualRefreshService2018"
          }
        },
        "termsOfUse": {"@id": "cred:termsOfUse", "@type": "@id"},
        "validFrom": {"@id": "cred:validFrom", "@type": "xsd:dateTime"},
        "validUntil": {"@id": "cred:validUntil", "@type": "xsd:dateTime"}
      }
    },

    "VerifiablePresentation": {
      "@id": "https://www.w3.org/2018/credentials#VerifiablePresentation",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "cred": "https://www.w3.org/2018/credentials#",
        "sec": "https://w3id.org/security#",

        "holder": {"@id": "cred:holder", "@type": "@id"},
        "proof": {"@id": "sec:proof", "@type": "@id", "@container": "@graph"},
        "verifiableCredential": {"@id": "cred:verifiableCredential", "@type": "@id", "@container": "@graph"}
      }
    },

    "EcdsaSecp256k1Signature2019": {
      "@id": "https://w3id.org/security#EcdsaSecp256k1Signature2019",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "sec": "https://w3id.org/security#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",

        "challenge": "sec:challenge",
        "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
        "domain": "sec:domain",
        "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
        "jws": "sec:jws",
        "nonce": "sec:nonce",
        "proofPurpose": {
          "@id": "sec:proofPurpose",
          "@type": "@vocab",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "sec": "https://w3id.org/security#",

            "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
            "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
          }
        },
        "proofValue": "sec:proofValue",
        "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
      }
    },

    "EcdsaSecp256r1Signature2019": {
      "@id": "https://w3id.org/security#EcdsaSecp256r1Signature2019",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "sec": "https://w3id.org/security#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",

        "challenge": "sec:challenge",
        "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
        "domain": "sec:domain",
        "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
        "jws": "sec:jws",
        "nonce": "sec:nonce",
        "proofPurpose": {
          "@id": "sec:proofPurpose",
          "@type": "@vocab",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "sec": "https://w3id.org/security#",

            "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
            "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
          }
        },
        "proofValue": "sec:proofValue",
        "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
      }
    },

    "Ed25519Signature2018": {
      "@id": "https://w3id.org/security#Ed25519Signature2018",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "sec": "https://w3id.org/security#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",

        "challenge": "sec:challenge",
        "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
        "domain": "sec:domain",
        "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
        "jws": "sec:jws",
        "nonce": "sec:nonce",
        "proofPurpose": {
          "@id": "sec:proofPurpose",
          "@type": "@vocab",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "sec": "https://w3id.org/security#",

            "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
            "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
          }
        },
        "proofValue": "sec:proofValue",
        "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
      }
    },

    "RsaSignature2018": {
      "@id": "https://w3id.org/security#RsaSignature2018",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "challenge": "sec:challenge",
        "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
        "domain": "sec:domain",
        "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
        "jws": "sec:jws",
        "nonce": "sec:nonce",
        "proofPurpose": {
          "@id": "sec:proofPurpose",
          "@type": "@vocab",
          "@context": {
            "@version": 1.1,
            "@protected": true,

            "id": "@id",
            "type": "@type",

            "sec": "https://w3id.org/security#",

            "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
            "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
          }
        },
        "proofValue": "sec:proofValue",
        "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
      }
    },

    "proof": {"@id": "https://w3id.org/security#proof", "@type": "@id", "@container": "@graph"}
  }
}`,
  ContentPublishCredential: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "@version": 1.1,
      "@rootType": "ContentPublishCredential",
      "w3ccred": "https://www.w3.org/2018/credentials#",
      "schema-id": "https://consensysidentity.com/schema/ContentPublishCredential#",
      "ContentPublishCredential": {
        "@id": "schema-id",
        "@title": "Content Publish Credential",
        "@contains": ["issuer", "issuanceDate", "credentialSubject"]
      },
      "issuer": {
        "@id": "w3ccred:issuer",
        "@type": "@id",
        "@required": true
      },
      "issuanceDate": {
        "@id": "w3ccred:issuanceDate",
        "@type": "xsd:dateTime",
        "@required": true
      },
      "credentialSubject": {
        "@id": "w3ccred:credentialSubject",
        "@required": true,
        "@contains": "publishedContent",
        "@context": {
          "id": {
            "@id": "@id",
            "@description": "Publisher DID",
            "@dataType": "string",
            "@required": true
          }
        }
      },
      "Organization": {
        "@id": "http://schema.org/Organization",
        "@context": {
          "id": {
            "@id": "@id",
            "@dataType": "string"
          },
          "name": {
            "@id": "http://schema.org/name",
            "@type": "http://schema.org/Text",
            "@dataType": "string",
            "@required": true
          },
          "url": {
            "@id": "http://schema.org/url",
            "@type": "@id",
            "@dataType": "string",
            "@format": "uri",
            "@required": true
          }
        }
      },
      "Person": {
        "@id": "http://schema.org/Person",
        "@context": {
          "id": {
            "@id": "@id",
            "@dataType": "string"
          },
          "name": {
            "@id": "http://schema.org/name",
            "@type": "http://schema.org/Text",
            "@dataType": "string",
            "@required": true
          }
        }
      },
      "Article": {
        "@id": "http://schema.org/Article",
        "@context": {
          "id": {
            "@id": "@id",
            "@dataType": "string",
            "@required": true
          },
          "versionId": {
            "@id": "schema-id:versionId",
            "@type": "https://schema.org/Text",
            "@dataType": "string",
            "@description": "Globally unique identifier URI that refers to this version of this piece of content"
          },
          "headline": {
            "@id": "http://schema.org/headline",
            "@type": "http://schema.org/Text",
            "@dataType": "string",
            "@required": true
          },
          "url": {
            "@id": "http://schema.org/url",
            "@type": "@id",
            "@dataType": "string",
            "@format": "uri",
            "@required": true
          },
          "datePublished": {
            "@id": "schema-id:datePublished",
            "@type": "http://schema.org/datePublished",
            "@dataType": "string",
            "@format": "date-time",
            "@required": true
          },
          "publisher": {
            "@id": "http://schema.org/publisher",
            "@type": "Organization",
            "@required": true,
            "@replaceWith": "Organization"
          },
          "author": {
            "@id": "http://schema.org/author",
            "@type": "Person",
            "@replaceWith": "Person"
          }
        }
      },
      "publishedContent": {
        "@id": "schema-id:publishedContent",
        "@description": "Data about piece of content this publisher has published",
        "@required": true,
        "@replaceWith": "Article"
      }
    }
  ]
}`, // publisher/author @id's should be schema.org. need @type?
  ContentPublishCredentialProgrammatic: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "@version": 1.1,
      "@rootType": "ContentPublishCredential",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "w3ccred": "https://www.w3.org/2018/credentials#",
      "schema-id": "https://consensysidentity.com/schema/ContentPublishCredential#",
      "ContentPublishCredential": {
        "@id": "schema-id",
        "@title": "Content Publish Credential",
        "@contains": ["credentialSubject", "issuer", "issuanceDate"]
      },
      "issuer": {
        "@id": "w3ccred:issuer",
        "@type": "@id",
        "@required": true
      },
      "issuanceDate": {
        "@id": "w3ccred:issuanceDate",
        "@type": "xsd:dateTime",
        "@required": true
      },
      "credentialSubject": {
        "@id": "w3ccred:credentialSubject",
        "@required": true,
        "@contains": "publishedContent",
        "@context": {
          "id": {
            "@id": "@id",
            "@dataType": "string",
            "@description": "Publisher DID",
            "@required": true
          }
        }
      },
      "publishedContent": {
        "@id": "schema-id:publishedContent",
        "@description": "Data about piece of content this publisher has published",
        "@required": true,
        "@context": {
          "id": {
            "@id": "schema-id:content-id",
            "@type": "xsd:string",
            "@dataType": "string"
          },
          "versionId": {
            "@id": "schema-id:versionId",
            "@type": "xsd:string",
            "@dataType": "string",
            "@description": "Globally unique identifier URI that refers to this version of this piece of content"
          },
          "headline": {
            "@id": "schema-id:headline",
            "@type": "xsd:string",
            "@dataType": "string",
            "@required": true
          },
          "url": {
            "@id": "schema-id:url",
            "@type": "xsd:string",
            "@dataType": "string",
            "@required": true
          },
          "datePublished": {
            "@id": "schema-id:datePublished",
            "@type": "xsd:dateTime",
            "@dataType": "string",
            "@format": "date-time",
            "@required": true
          },
          "publisher": {
            "@id": "schema-id:publisher",
            "@required": true,
            "@context": {
              "id": {
                "@id": "schema-id:publisher-id",
                "@type": "xsd:string",
                "@dataType": "string"
              },
              "name": {
                "@id": "schema-id:publisher-name",
                "@type": "xsd:string",
                "@dataType": "string",
                "@required": true
              },
              "url": {
                "@id": "schema-id:publisher-url",
                "@type": "xsd:string",
                "@dataType": "string",
                "@format": "uri",
                "@required": true
              }
            }
          },
          "author": {
            "@id": "schema-id:author",
            "@context": {
              "id": {
                "@id": "schema-id:publisher-id",
                "@type": "xsd:string",
                "@dataType": "string"
              },
              "name": {
                "@id": "schema-id:author-name",
                "@type": "xsd:string",
                "@dataType": "string",
                "@required": true
              }
            }
          }
        }
      }
    }
  ]
}`,
  ContentPublishCredentialMinimal: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "@version": 1.1,
      "@rootType": "ContentPublishCredential",
      "w3ccred": "https://www.w3.org/2018/credentials#",
      "schema-id": "https://consensysidentity.com/schema/ContentPublishCredential#",
      "ContentPublishCredential": {
        "@id": "schema-id",
        "@contains": "credentialSubject"
      },
      "credentialSubject": {
        "@id": "w3ccred:credentialSubject",
        "@required": true,
        "@contains": "publishedContent",
        "@context": {
          "id": {
            "@id": "@id",
            "@dataType": "string",
            "@required": true
          }
        }
      },
      "publishedContent": {
        "@id": "schema-id:publishedContent",
        "@description": "Data about piece of content this publisher has published",
        "@required": true,
        "@context": {
          "url": {
            "@id": "http://schema.org/url",
            "@type": "http://schema.org/URL",
            "@dataType": "string",
            "@required": true
          }
        }
      }
    }
  ]
}`,
};

// @TODO/tobek Handle merging of new and existing @context's.
export const EXAMPLE_VCS: { [key: string]: string } = {
  ContentPublishCredential: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://consensysidentity.com/schema/ContentPublishCredential"
  ],
  "@id": "did:example:publisher-did#credential-id",
  "@type": ["VerifiableCredential", "ContentPublishCredential"],
  "issuer": "did:example:publisher-did",
  "issuanceDate": "2017-12-05T14:27:42Z",
  "credentialSubject": {
    "id": "did:example:publisher-did",
    "publishedContent": {
      "@type": "Article",
      "id": "did:example:publisher-did#article-id",
      "versionId": "did:example:publisher-did#article-version-id",
      "headline": "A Very Important Article",
      "url": "https://example-publisher.com/articles/a-very-important-article",
      "datePublished": "2020-06-29T00:04:12.418Z",
      "publisher": {
        "@type": "Organization",
        "id": "did:example:publisher-did",
        "name": "Example Publisher",
        "url": "https://example-publisher.com/"
      },
      "author": {
        "@type": "Person",
        "id": "did:example:publisher-did#author-id",
        "name": "Joe Reporter"
      }
    }
  }
}`,
  ContentPublishCredentialProgrammatic: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://consensysidentity.com/schema/ContentPublishCredential"
  ],
  "@id": "did:example:publisher-did#credential-id",
  "@type": ["VerifiableCredential", "ContentPublishCredential"],
  "issuer": "did:example:publisher-did",
  "issuanceDate": "2017-12-05T14:27:42Z",
  "credentialSubject": {
    "id": "did:example:publisher-did",
    "publishedContent": {
      "id": "did:example:publisher-did#article-id",
      "versionId": "did:example:publisher-did#article-version-id",
      "headline": "A Very Important Article",
      "url": "https://example-publisher.com/articles/a-very-important-article",
      "datePublished": "2020-06-29T00:04:12.418Z",
      "publisher": {
        "id": "did:example:publisher-did",
        "name": "Example Publisher",
        "url": "https://example-publisher.com/"
      },
      "author": {
        "id": "did:example:publisher-did#author-id",
        "name": "Joe Reporter"
      }
    }
  }
}`,
  ContentPublishCredentialMinimal: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://consensysidentity.com/schema/ContentPublishCredential"
  ],
  "@id": "did:example:publisher-did#credential-id",
  "@type": ["VerifiableCredential", "ContentPublishCredential"],
  "issuer": "did:example:publisher-did",
  "issuanceDate": "2017-12-05T14:27:42Z",
  "credentialSubject": {
    "id": "did:example:publisher-did",
    "publishedContent": {
      "url": "https://example-publisher.com/articles/a-very-important-article"
    }
  }
}`,
};
