
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RPLParserListener } from "./RPLParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RPLParser extends antlr.Parser {
    public static readonly ROLE = 1;
    public static readonly USER = 2;
    public static readonly RESOURCE = 3;
    public static readonly CAN = 4;
    public static readonly EXTENDS = 5;
    public static readonly PERMISSIONS = 6;
    public static readonly ACTIONS = 7;
    public static readonly RESOURCES = 8;
    public static readonly CONDITIONS = 9;
    public static readonly GROUP = 10;
    public static readonly MEMBERS = 11;
    public static readonly VALID_FROM = 12;
    public static readonly VALID_UNTIL = 13;
    public static readonly PATH = 14;
    public static readonly TYPE = 15;
    public static readonly METADATA = 16;
    public static readonly API = 17;
    public static readonly FOLDER = 18;
    public static readonly DATABASE = 19;
    public static readonly AND = 20;
    public static readonly OR = 21;
    public static readonly NOT = 22;
    public static readonly READ = 23;
    public static readonly WRITE = 24;
    public static readonly MODIFY = 25;
    public static readonly START = 26;
    public static readonly STOP = 27;
    public static readonly DEPLOY = 28;
    public static readonly DELETE = 29;
    public static readonly EXECUTE = 30;
    public static readonly STAR = 31;
    public static readonly EQ = 32;
    public static readonly NE = 33;
    public static readonly LT = 34;
    public static readonly GT = 35;
    public static readonly LE = 36;
    public static readonly GE = 37;
    public static readonly PLUS = 38;
    public static readonly MINUS = 39;
    public static readonly DIV = 40;
    public static readonly IN = 41;
    public static readonly CONTAINS = 42;
    public static readonly LBRACKET = 43;
    public static readonly RBRACKET = 44;
    public static readonly LPAREN = 45;
    public static readonly RPAREN = 46;
    public static readonly LBRACE = 47;
    public static readonly RBRACE = 48;
    public static readonly COLON = 49;
    public static readonly COMMA = 50;
    public static readonly DOT = 51;
    public static readonly BOOLEAN = 52;
    public static readonly INTEGER = 53;
    public static readonly REAL = 54;
    public static readonly STRING = 55;
    public static readonly CHARACTER = 56;
    public static readonly IDENTIFIER = 57;
    public static readonly WS = 58;
    public static readonly LINE_COMMENT = 59;
    public static readonly BLOCK_COMMENT = 60;
    public static readonly RULE_program = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_roleDeclaration = 2;
    public static readonly RULE_roleBody = 3;
    public static readonly RULE_rolePermissions = 4;
    public static readonly RULE_permissionBlock = 5;
    public static readonly RULE_userDeclaration = 6;
    public static readonly RULE_userBody = 7;
    public static readonly RULE_validPeriod = 8;
    public static readonly RULE_userRoles = 9;
    public static readonly RULE_validFrom = 10;
    public static readonly RULE_validUntil = 11;
    public static readonly RULE_resourceDeclaration = 12;
    public static readonly RULE_resourceBody = 13;
    public static readonly RULE_resourceProperty = 14;
    public static readonly RULE_resourceType = 15;
    public static readonly RULE_metadataBlock = 16;
    public static readonly RULE_metadataEntry = 17;
    public static readonly RULE_resourceList = 18;
    public static readonly RULE_resourceRef = 19;
    public static readonly RULE_groupDeclaration = 20;
    public static readonly RULE_groupBody = 21;
    public static readonly RULE_groupMembers = 22;
    public static readonly RULE_memberList = 23;
    public static readonly RULE_groupRoles = 24;
    public static readonly RULE_actionList = 25;
    public static readonly RULE_permission = 26;
    public static readonly RULE_condition = 27;
    public static readonly RULE_orCondition = 28;
    public static readonly RULE_andCondition = 29;
    public static readonly RULE_notCondition = 30;
    public static readonly RULE_primaryCondition = 31;
    public static readonly RULE_comparison = 32;
    public static readonly RULE_comparisonOp = 33;
    public static readonly RULE_expression = 34;
    public static readonly RULE_additiveExpr = 35;
    public static readonly RULE_multiplicativeExpr = 36;
    public static readonly RULE_unaryExpr = 37;
    public static readonly RULE_primaryExpr = 38;
    public static readonly RULE_atom = 39;
    public static readonly RULE_qualifiedName = 40;
    public static readonly RULE_value = 41;
    public static readonly RULE_valueList = 42;

    public static readonly literalNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, "'*'", "'=='", 
        "'!='", "'<'", "'>'", "'<='", "'>='", "'+'", "'-'", "'/'", null, 
        null, "'['", "']'", "'('", "')'", "'{'", "'}'", "':'", "','", "'.'"
    ];

    public static readonly symbolicNames = [
        null, "ROLE", "USER", "RESOURCE", "CAN", "EXTENDS", "PERMISSIONS", 
        "ACTIONS", "RESOURCES", "CONDITIONS", "GROUP", "MEMBERS", "VALID_FROM", 
        "VALID_UNTIL", "PATH", "TYPE", "METADATA", "API", "FOLDER", "DATABASE", 
        "AND", "OR", "NOT", "READ", "WRITE", "MODIFY", "START", "STOP", 
        "DEPLOY", "DELETE", "EXECUTE", "STAR", "EQ", "NE", "LT", "GT", "LE", 
        "GE", "PLUS", "MINUS", "DIV", "IN", "CONTAINS", "LBRACKET", "RBRACKET", 
        "LPAREN", "RPAREN", "LBRACE", "RBRACE", "COLON", "COMMA", "DOT", 
        "BOOLEAN", "INTEGER", "REAL", "STRING", "CHARACTER", "IDENTIFIER", 
        "WS", "LINE_COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "statement", "roleDeclaration", "roleBody", "rolePermissions", 
        "permissionBlock", "userDeclaration", "userBody", "validPeriod", 
        "userRoles", "validFrom", "validUntil", "resourceDeclaration", "resourceBody", 
        "resourceProperty", "resourceType", "metadataBlock", "metadataEntry", 
        "resourceList", "resourceRef", "groupDeclaration", "groupBody", 
        "groupMembers", "memberList", "groupRoles", "actionList", "permission", 
        "condition", "orCondition", "andCondition", "notCondition", "primaryCondition", 
        "comparison", "comparisonOp", "expression", "additiveExpr", "multiplicativeExpr", 
        "unaryExpr", "primaryExpr", "atom", "qualifiedName", "value", "valueList",
    ];

    public get grammarFileName(): string { return "RPLParser.g4"; }
    public get literalNames(): (string | null)[] { return RPLParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RPLParser.symbolicNames; }
    public get ruleNames(): string[] { return RPLParser.ruleNames; }
    public get serializedATN(): number[] { return RPLParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RPLParser._ATN, RPLParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, RPLParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 89;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1038) !== 0)) {
                {
                {
                this.state = 86;
                this.statement();
                }
                }
                this.state = 91;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 92;
            this.match(RPLParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 2, RPLParser.RULE_statement);
        try {
            this.state = 98;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.ROLE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 94;
                this.roleDeclaration();
                }
                break;
            case RPLParser.USER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 95;
                this.userDeclaration();
                }
                break;
            case RPLParser.RESOURCE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 96;
                this.resourceDeclaration();
                }
                break;
            case RPLParser.GROUP:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 97;
                this.groupDeclaration();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public roleDeclaration(): RoleDeclarationContext {
        let localContext = new RoleDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 4, RPLParser.RULE_roleDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(RPLParser.ROLE);
            this.state = 101;
            this.match(RPLParser.IDENTIFIER);
            this.state = 104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 102;
                this.match(RPLParser.EXTENDS);
                this.state = 103;
                this.match(RPLParser.IDENTIFIER);
                }
            }

            this.state = 106;
            this.match(RPLParser.LBRACE);
            this.state = 107;
            this.roleBody();
            this.state = 108;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public roleBody(): RoleBodyContext {
        let localContext = new RoleBodyContext(this.context, this.state);
        this.enterRule(localContext, 6, RPLParser.RULE_roleBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 110;
                this.rolePermissions();
                }
                }
                this.state = 113;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 4 || _la === 6);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public rolePermissions(): RolePermissionsContext {
        let localContext = new RolePermissionsContext(this.context, this.state);
        this.enterRule(localContext, 8, RPLParser.RULE_rolePermissions);
        let _la: number;
        try {
            this.state = 146;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.PERMISSIONS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 115;
                this.match(RPLParser.PERMISSIONS);
                this.state = 116;
                this.match(RPLParser.COLON);
                this.state = 117;
                this.match(RPLParser.LBRACKET);
                this.state = 118;
                this.permissionBlock();
                this.state = 123;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 50) {
                    {
                    {
                    this.state = 119;
                    this.match(RPLParser.COMMA);
                    this.state = 120;
                    this.permissionBlock();
                    }
                    }
                    this.state = 125;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 126;
                this.match(RPLParser.RBRACKET);
                }
                break;
            case RPLParser.CAN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 128;
                this.match(RPLParser.CAN);
                this.state = 129;
                this.match(RPLParser.COLON);
                this.state = 130;
                this.match(RPLParser.LBRACKET);
                this.state = 131;
                this.permission();
                this.state = 136;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 50) {
                    {
                    {
                    this.state = 132;
                    this.match(RPLParser.COMMA);
                    this.state = 133;
                    this.permission();
                    }
                    }
                    this.state = 138;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 139;
                this.match(RPLParser.RBRACKET);
                this.state = 140;
                this.match(RPLParser.RESOURCES);
                this.state = 141;
                this.match(RPLParser.COLON);
                this.state = 142;
                this.match(RPLParser.LBRACKET);
                this.state = 143;
                this.resourceList();
                this.state = 144;
                this.match(RPLParser.RBRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public permissionBlock(): PermissionBlockContext {
        let localContext = new PermissionBlockContext(this.context, this.state);
        this.enterRule(localContext, 10, RPLParser.RULE_permissionBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 148;
            this.match(RPLParser.LBRACE);
            this.state = 149;
            this.match(RPLParser.ACTIONS);
            this.state = 150;
            this.match(RPLParser.COLON);
            this.state = 151;
            this.match(RPLParser.LBRACKET);
            this.state = 152;
            this.actionList();
            this.state = 153;
            this.match(RPLParser.RBRACKET);
            this.state = 154;
            this.match(RPLParser.COMMA);
            this.state = 155;
            this.match(RPLParser.RESOURCES);
            this.state = 156;
            this.match(RPLParser.COLON);
            this.state = 157;
            this.match(RPLParser.LBRACKET);
            this.state = 158;
            this.resourceList();
            this.state = 159;
            this.match(RPLParser.RBRACKET);
            this.state = 164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 50) {
                {
                this.state = 160;
                this.match(RPLParser.COMMA);
                this.state = 161;
                this.match(RPLParser.CONDITIONS);
                this.state = 162;
                this.match(RPLParser.COLON);
                this.state = 163;
                this.condition();
                }
            }

            this.state = 166;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userDeclaration(): UserDeclarationContext {
        let localContext = new UserDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 12, RPLParser.RULE_userDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            this.match(RPLParser.USER);
            this.state = 169;
            this.match(RPLParser.IDENTIFIER);
            this.state = 170;
            this.match(RPLParser.LBRACE);
            this.state = 171;
            this.userBody();
            this.state = 172;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userBody(): UserBodyContext {
        let localContext = new UserBodyContext(this.context, this.state);
        this.enterRule(localContext, 14, RPLParser.RULE_userBody);
        let _la: number;
        try {
            this.state = 183;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 174;
                    this.userRoles();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 177;
                    this.userRoles();
                    }
                }

                this.state = 180;
                this.match(RPLParser.COMMA);
                this.state = 181;
                this.validPeriod();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 182;
                this.validPeriod();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validPeriod(): ValidPeriodContext {
        let localContext = new ValidPeriodContext(this.context, this.state);
        this.enterRule(localContext, 16, RPLParser.RULE_validPeriod);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 185;
            this.validFrom();
            this.state = 186;
            this.match(RPLParser.COMMA);
            this.state = 187;
            this.validUntil();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userRoles(): UserRolesContext {
        let localContext = new UserRolesContext(this.context, this.state);
        this.enterRule(localContext, 18, RPLParser.RULE_userRoles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 189;
            this.match(RPLParser.ROLE);
            this.state = 190;
            this.match(RPLParser.COLON);
            this.state = 191;
            this.match(RPLParser.LBRACKET);
            this.state = 192;
            this.match(RPLParser.IDENTIFIER);
            this.state = 197;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 193;
                this.match(RPLParser.COMMA);
                this.state = 194;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 199;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 200;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validFrom(): ValidFromContext {
        let localContext = new ValidFromContext(this.context, this.state);
        this.enterRule(localContext, 20, RPLParser.RULE_validFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.match(RPLParser.VALID_FROM);
            this.state = 203;
            this.match(RPLParser.COLON);
            this.state = 204;
            this.match(RPLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validUntil(): ValidUntilContext {
        let localContext = new ValidUntilContext(this.context, this.state);
        this.enterRule(localContext, 22, RPLParser.RULE_validUntil);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(RPLParser.VALID_UNTIL);
            this.state = 207;
            this.match(RPLParser.COLON);
            this.state = 208;
            this.match(RPLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceDeclaration(): ResourceDeclarationContext {
        let localContext = new ResourceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 24, RPLParser.RULE_resourceDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 210;
            this.match(RPLParser.RESOURCE);
            this.state = 211;
            this.match(RPLParser.IDENTIFIER);
            this.state = 212;
            this.match(RPLParser.LBRACE);
            this.state = 213;
            this.resourceBody();
            this.state = 214;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceBody(): ResourceBodyContext {
        let localContext = new ResourceBodyContext(this.context, this.state);
        this.enterRule(localContext, 26, RPLParser.RULE_resourceBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.resourceProperty();
            this.state = 221;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 217;
                this.match(RPLParser.COMMA);
                this.state = 218;
                this.resourceProperty();
                }
                }
                this.state = 223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceProperty(): ResourcePropertyContext {
        let localContext = new ResourcePropertyContext(this.context, this.state);
        this.enterRule(localContext, 28, RPLParser.RULE_resourceProperty);
        try {
            this.state = 233;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.PATH:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 224;
                this.match(RPLParser.PATH);
                this.state = 225;
                this.match(RPLParser.COLON);
                this.state = 226;
                this.match(RPLParser.STRING);
                }
                break;
            case RPLParser.TYPE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 227;
                this.match(RPLParser.TYPE);
                this.state = 228;
                this.match(RPLParser.COLON);
                this.state = 229;
                this.resourceType();
                }
                break;
            case RPLParser.METADATA:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 230;
                this.match(RPLParser.METADATA);
                this.state = 231;
                this.match(RPLParser.COLON);
                this.state = 232;
                this.metadataBlock();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceType(): ResourceTypeContext {
        let localContext = new ResourceTypeContext(this.context, this.state);
        this.enterRule(localContext, 30, RPLParser.RULE_resourceType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 917504) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public metadataBlock(): MetadataBlockContext {
        let localContext = new MetadataBlockContext(this.context, this.state);
        this.enterRule(localContext, 32, RPLParser.RULE_metadataBlock);
        let _la: number;
        try {
            this.state = 250;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 237;
                this.match(RPLParser.LBRACE);
                this.state = 238;
                this.metadataEntry();
                this.state = 243;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 50) {
                    {
                    {
                    this.state = 239;
                    this.match(RPLParser.COMMA);
                    this.state = 240;
                    this.metadataEntry();
                    }
                    }
                    this.state = 245;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 246;
                this.match(RPLParser.RBRACE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 248;
                this.match(RPLParser.LBRACE);
                this.state = 249;
                this.match(RPLParser.RBRACE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public metadataEntry(): MetadataEntryContext {
        let localContext = new MetadataEntryContext(this.context, this.state);
        this.enterRule(localContext, 34, RPLParser.RULE_metadataEntry);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 252;
            this.match(RPLParser.IDENTIFIER);
            this.state = 253;
            this.match(RPLParser.COLON);
            this.state = 254;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceList(): ResourceListContext {
        let localContext = new ResourceListContext(this.context, this.state);
        this.enterRule(localContext, 36, RPLParser.RULE_resourceList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.resourceRef();
            this.state = 261;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 257;
                this.match(RPLParser.COMMA);
                this.state = 258;
                this.resourceRef();
                }
                }
                this.state = 263;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceRef(): ResourceRefContext {
        let localContext = new ResourceRefContext(this.context, this.state);
        this.enterRule(localContext, 38, RPLParser.RULE_resourceRef);
        let _la: number;
        try {
            this.state = 273;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 264;
                this.match(RPLParser.IDENTIFIER);
                this.state = 269;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 51) {
                    {
                    {
                    this.state = 265;
                    this.match(RPLParser.DOT);
                    this.state = 266;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 31 || _la === 57)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                    this.state = 271;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 272;
                this.match(RPLParser.STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupDeclaration(): GroupDeclarationContext {
        let localContext = new GroupDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 40, RPLParser.RULE_groupDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 275;
            this.match(RPLParser.GROUP);
            this.state = 276;
            this.match(RPLParser.IDENTIFIER);
            this.state = 277;
            this.match(RPLParser.LBRACE);
            this.state = 278;
            this.groupBody();
            this.state = 279;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupBody(): GroupBodyContext {
        let localContext = new GroupBodyContext(this.context, this.state);
        this.enterRule(localContext, 42, RPLParser.RULE_groupBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 282;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 281;
                this.groupMembers();
                }
            }

            this.state = 288;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 50) {
                {
                this.state = 284;
                this.match(RPLParser.COMMA);
                this.state = 286;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 285;
                    this.groupRoles();
                    }
                }

                }
            }

            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupMembers(): GroupMembersContext {
        let localContext = new GroupMembersContext(this.context, this.state);
        this.enterRule(localContext, 44, RPLParser.RULE_groupMembers);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            this.match(RPLParser.MEMBERS);
            this.state = 291;
            this.match(RPLParser.COLON);
            this.state = 292;
            this.match(RPLParser.LBRACKET);
            this.state = 293;
            this.memberList();
            this.state = 294;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public memberList(): MemberListContext {
        let localContext = new MemberListContext(this.context, this.state);
        this.enterRule(localContext, 46, RPLParser.RULE_memberList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(RPLParser.IDENTIFIER);
            this.state = 301;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 297;
                this.match(RPLParser.COMMA);
                this.state = 298;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 303;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupRoles(): GroupRolesContext {
        let localContext = new GroupRolesContext(this.context, this.state);
        this.enterRule(localContext, 48, RPLParser.RULE_groupRoles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 304;
            this.match(RPLParser.ROLE);
            this.state = 305;
            this.match(RPLParser.COLON);
            this.state = 306;
            this.match(RPLParser.LBRACKET);
            this.state = 307;
            this.match(RPLParser.IDENTIFIER);
            this.state = 312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 308;
                this.match(RPLParser.COMMA);
                this.state = 309;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 315;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public actionList(): ActionListContext {
        let localContext = new ActionListContext(this.context, this.state);
        this.enterRule(localContext, 50, RPLParser.RULE_actionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 317;
            this.permission();
            this.state = 322;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 318;
                this.match(RPLParser.COMMA);
                this.state = 319;
                this.permission();
                }
                }
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public permission(): PermissionContext {
        let localContext = new PermissionContext(this.context, this.state);
        this.enterRule(localContext, 52, RPLParser.RULE_permission);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 325;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4286578688) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public condition(): ConditionContext {
        let localContext = new ConditionContext(this.context, this.state);
        this.enterRule(localContext, 54, RPLParser.RULE_condition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 327;
            this.orCondition();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orCondition(): OrConditionContext {
        let localContext = new OrConditionContext(this.context, this.state);
        this.enterRule(localContext, 56, RPLParser.RULE_orCondition);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 329;
            this.andCondition();
            this.state = 334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 21) {
                {
                {
                this.state = 330;
                this.match(RPLParser.OR);
                this.state = 331;
                this.andCondition();
                }
                }
                this.state = 336;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andCondition(): AndConditionContext {
        let localContext = new AndConditionContext(this.context, this.state);
        this.enterRule(localContext, 58, RPLParser.RULE_andCondition);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 337;
            this.notCondition();
            this.state = 342;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 20) {
                {
                {
                this.state = 338;
                this.match(RPLParser.AND);
                this.state = 339;
                this.notCondition();
                }
                }
                this.state = 344;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public notCondition(): NotConditionContext {
        let localContext = new NotConditionContext(this.context, this.state);
        this.enterRule(localContext, 60, RPLParser.RULE_notCondition);
        try {
            this.state = 348;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 345;
                this.match(RPLParser.NOT);
                this.state = 346;
                this.notCondition();
                }
                break;
            case RPLParser.PLUS:
            case RPLParser.MINUS:
            case RPLParser.LPAREN:
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 347;
                this.primaryCondition();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryCondition(): PrimaryConditionContext {
        let localContext = new PrimaryConditionContext(this.context, this.state);
        this.enterRule(localContext, 62, RPLParser.RULE_primaryCondition);
        try {
            this.state = 355;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 350;
                this.match(RPLParser.LPAREN);
                this.state = 351;
                this.condition();
                this.state = 352;
                this.match(RPLParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 354;
                this.comparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparison(): ComparisonContext {
        let localContext = new ComparisonContext(this.context, this.state);
        this.enterRule(localContext, 64, RPLParser.RULE_comparison);
        try {
            this.state = 371;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 357;
                this.expression();
                this.state = 358;
                this.comparisonOp();
                this.state = 359;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 361;
                this.expression();
                this.state = 362;
                this.match(RPLParser.IN);
                this.state = 363;
                this.match(RPLParser.LBRACKET);
                this.state = 364;
                this.valueList();
                this.state = 365;
                this.match(RPLParser.RBRACKET);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 367;
                this.expression();
                this.state = 368;
                this.match(RPLParser.CONTAINS);
                this.state = 369;
                this.value();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparisonOp(): ComparisonOpContext {
        let localContext = new ComparisonOpContext(this.context, this.state);
        this.enterRule(localContext, 66, RPLParser.RULE_comparisonOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 63) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 68, RPLParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 375;
            this.additiveExpr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public additiveExpr(): AdditiveExprContext {
        let localContext = new AdditiveExprContext(this.context, this.state);
        this.enterRule(localContext, 70, RPLParser.RULE_additiveExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 377;
            this.multiplicativeExpr();
            this.state = 382;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 38 || _la === 39) {
                {
                {
                this.state = 378;
                _la = this.tokenStream.LA(1);
                if(!(_la === 38 || _la === 39)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 379;
                this.multiplicativeExpr();
                }
                }
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public multiplicativeExpr(): MultiplicativeExprContext {
        let localContext = new MultiplicativeExprContext(this.context, this.state);
        this.enterRule(localContext, 72, RPLParser.RULE_multiplicativeExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.unaryExpr();
            this.state = 390;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31 || _la === 40) {
                {
                {
                this.state = 386;
                _la = this.tokenStream.LA(1);
                if(!(_la === 31 || _la === 40)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 387;
                this.unaryExpr();
                }
                }
                this.state = 392;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpr(): UnaryExprContext {
        let localContext = new UnaryExprContext(this.context, this.state);
        this.enterRule(localContext, 74, RPLParser.RULE_unaryExpr);
        try {
            this.state = 398;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.PLUS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 393;
                this.match(RPLParser.PLUS);
                this.state = 394;
                this.unaryExpr();
                }
                break;
            case RPLParser.MINUS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 395;
                this.match(RPLParser.MINUS);
                this.state = 396;
                this.unaryExpr();
                }
                break;
            case RPLParser.LPAREN:
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 397;
                this.primaryExpr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryExpr(): PrimaryExprContext {
        let localContext = new PrimaryExprContext(this.context, this.state);
        this.enterRule(localContext, 76, RPLParser.RULE_primaryExpr);
        try {
            this.state = 405;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 400;
                this.match(RPLParser.LPAREN);
                this.state = 401;
                this.expression();
                this.state = 402;
                this.match(RPLParser.RPAREN);
                }
                break;
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 404;
                this.atom();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public atom(): AtomContext {
        let localContext = new AtomContext(this.context, this.state);
        this.enterRule(localContext, 78, RPLParser.RULE_atom);
        try {
            this.state = 412;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.INTEGER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 407;
                this.match(RPLParser.INTEGER);
                }
                break;
            case RPLParser.REAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 408;
                this.match(RPLParser.REAL);
                }
                break;
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 409;
                this.match(RPLParser.STRING);
                }
                break;
            case RPLParser.BOOLEAN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 410;
                this.match(RPLParser.BOOLEAN);
                }
                break;
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 411;
                this.qualifiedName();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public qualifiedName(): QualifiedNameContext {
        let localContext = new QualifiedNameContext(this.context, this.state);
        this.enterRule(localContext, 80, RPLParser.RULE_qualifiedName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.match(RPLParser.IDENTIFIER);
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 51) {
                {
                {
                this.state = 415;
                this.match(RPLParser.DOT);
                this.state = 416;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public value(): ValueContext {
        let localContext = new ValueContext(this.context, this.state);
        this.enterRule(localContext, 82, RPLParser.RULE_value);
        try {
            this.state = 432;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 422;
                this.match(RPLParser.STRING);
                }
                break;
            case RPLParser.CHARACTER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 423;
                this.match(RPLParser.CHARACTER);
                }
                break;
            case RPLParser.INTEGER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 424;
                this.match(RPLParser.INTEGER);
                }
                break;
            case RPLParser.REAL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 425;
                this.match(RPLParser.REAL);
                }
                break;
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 426;
                this.match(RPLParser.IDENTIFIER);
                }
                break;
            case RPLParser.BOOLEAN:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 427;
                this.match(RPLParser.BOOLEAN);
                }
                break;
            case RPLParser.LBRACKET:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 428;
                this.match(RPLParser.LBRACKET);
                this.state = 429;
                this.valueList();
                this.state = 430;
                this.match(RPLParser.RBRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueList(): ValueListContext {
        let localContext = new ValueListContext(this.context, this.state);
        this.enterRule(localContext, 84, RPLParser.RULE_valueList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 434;
            this.value();
            this.state = 439;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 435;
                this.match(RPLParser.COMMA);
                this.state = 436;
                this.value();
                }
                }
                this.state = 441;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,60,443,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,1,0,5,0,88,8,0,10,0,12,0,91,9,0,1,
        0,1,0,1,1,1,1,1,1,1,1,3,1,99,8,1,1,2,1,2,1,2,1,2,3,2,105,8,2,1,2,
        1,2,1,2,1,2,1,3,4,3,112,8,3,11,3,12,3,113,1,4,1,4,1,4,1,4,1,4,1,
        4,5,4,122,8,4,10,4,12,4,125,9,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,
        5,4,135,8,4,10,4,12,4,138,9,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,147,
        8,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
        1,5,3,5,165,8,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,3,7,176,8,7,
        1,7,3,7,179,8,7,1,7,1,7,1,7,3,7,184,8,7,1,8,1,8,1,8,1,8,1,9,1,9,
        1,9,1,9,1,9,1,9,5,9,196,8,9,10,9,12,9,199,9,9,1,9,1,9,1,10,1,10,
        1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,13,
        1,13,1,13,5,13,220,8,13,10,13,12,13,223,9,13,1,14,1,14,1,14,1,14,
        1,14,1,14,1,14,1,14,1,14,3,14,234,8,14,1,15,1,15,1,16,1,16,1,16,
        1,16,5,16,242,8,16,10,16,12,16,245,9,16,1,16,1,16,1,16,1,16,3,16,
        251,8,16,1,17,1,17,1,17,1,17,1,18,1,18,1,18,5,18,260,8,18,10,18,
        12,18,263,9,18,1,19,1,19,1,19,5,19,268,8,19,10,19,12,19,271,9,19,
        1,19,3,19,274,8,19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,3,21,283,8,
        21,1,21,1,21,3,21,287,8,21,3,21,289,8,21,1,22,1,22,1,22,1,22,1,22,
        1,22,1,23,1,23,1,23,5,23,300,8,23,10,23,12,23,303,9,23,1,24,1,24,
        1,24,1,24,1,24,1,24,5,24,311,8,24,10,24,12,24,314,9,24,1,24,1,24,
        1,25,1,25,1,25,5,25,321,8,25,10,25,12,25,324,9,25,1,26,1,26,1,27,
        1,27,1,28,1,28,1,28,5,28,333,8,28,10,28,12,28,336,9,28,1,29,1,29,
        1,29,5,29,341,8,29,10,29,12,29,344,9,29,1,30,1,30,1,30,3,30,349,
        8,30,1,31,1,31,1,31,1,31,1,31,3,31,356,8,31,1,32,1,32,1,32,1,32,
        1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,372,8,32,
        1,33,1,33,1,34,1,34,1,35,1,35,1,35,5,35,381,8,35,10,35,12,35,384,
        9,35,1,36,1,36,1,36,5,36,389,8,36,10,36,12,36,392,9,36,1,37,1,37,
        1,37,1,37,1,37,3,37,399,8,37,1,38,1,38,1,38,1,38,1,38,3,38,406,8,
        38,1,39,1,39,1,39,1,39,1,39,3,39,413,8,39,1,40,1,40,1,40,5,40,418,
        8,40,10,40,12,40,421,9,40,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,
        1,41,1,41,3,41,433,8,41,1,42,1,42,1,42,5,42,438,8,42,10,42,12,42,
        441,9,42,1,42,0,0,43,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
        32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
        76,78,80,82,84,0,6,1,0,17,19,2,0,31,31,57,57,1,0,23,31,1,0,32,37,
        1,0,38,39,2,0,31,31,40,40,451,0,89,1,0,0,0,2,98,1,0,0,0,4,100,1,
        0,0,0,6,111,1,0,0,0,8,146,1,0,0,0,10,148,1,0,0,0,12,168,1,0,0,0,
        14,183,1,0,0,0,16,185,1,0,0,0,18,189,1,0,0,0,20,202,1,0,0,0,22,206,
        1,0,0,0,24,210,1,0,0,0,26,216,1,0,0,0,28,233,1,0,0,0,30,235,1,0,
        0,0,32,250,1,0,0,0,34,252,1,0,0,0,36,256,1,0,0,0,38,273,1,0,0,0,
        40,275,1,0,0,0,42,282,1,0,0,0,44,290,1,0,0,0,46,296,1,0,0,0,48,304,
        1,0,0,0,50,317,1,0,0,0,52,325,1,0,0,0,54,327,1,0,0,0,56,329,1,0,
        0,0,58,337,1,0,0,0,60,348,1,0,0,0,62,355,1,0,0,0,64,371,1,0,0,0,
        66,373,1,0,0,0,68,375,1,0,0,0,70,377,1,0,0,0,72,385,1,0,0,0,74,398,
        1,0,0,0,76,405,1,0,0,0,78,412,1,0,0,0,80,414,1,0,0,0,82,432,1,0,
        0,0,84,434,1,0,0,0,86,88,3,2,1,0,87,86,1,0,0,0,88,91,1,0,0,0,89,
        87,1,0,0,0,89,90,1,0,0,0,90,92,1,0,0,0,91,89,1,0,0,0,92,93,5,0,0,
        1,93,1,1,0,0,0,94,99,3,4,2,0,95,99,3,12,6,0,96,99,3,24,12,0,97,99,
        3,40,20,0,98,94,1,0,0,0,98,95,1,0,0,0,98,96,1,0,0,0,98,97,1,0,0,
        0,99,3,1,0,0,0,100,101,5,1,0,0,101,104,5,57,0,0,102,103,5,5,0,0,
        103,105,5,57,0,0,104,102,1,0,0,0,104,105,1,0,0,0,105,106,1,0,0,0,
        106,107,5,47,0,0,107,108,3,6,3,0,108,109,5,48,0,0,109,5,1,0,0,0,
        110,112,3,8,4,0,111,110,1,0,0,0,112,113,1,0,0,0,113,111,1,0,0,0,
        113,114,1,0,0,0,114,7,1,0,0,0,115,116,5,6,0,0,116,117,5,49,0,0,117,
        118,5,43,0,0,118,123,3,10,5,0,119,120,5,50,0,0,120,122,3,10,5,0,
        121,119,1,0,0,0,122,125,1,0,0,0,123,121,1,0,0,0,123,124,1,0,0,0,
        124,126,1,0,0,0,125,123,1,0,0,0,126,127,5,44,0,0,127,147,1,0,0,0,
        128,129,5,4,0,0,129,130,5,49,0,0,130,131,5,43,0,0,131,136,3,52,26,
        0,132,133,5,50,0,0,133,135,3,52,26,0,134,132,1,0,0,0,135,138,1,0,
        0,0,136,134,1,0,0,0,136,137,1,0,0,0,137,139,1,0,0,0,138,136,1,0,
        0,0,139,140,5,44,0,0,140,141,5,8,0,0,141,142,5,49,0,0,142,143,5,
        43,0,0,143,144,3,36,18,0,144,145,5,44,0,0,145,147,1,0,0,0,146,115,
        1,0,0,0,146,128,1,0,0,0,147,9,1,0,0,0,148,149,5,47,0,0,149,150,5,
        7,0,0,150,151,5,49,0,0,151,152,5,43,0,0,152,153,3,50,25,0,153,154,
        5,44,0,0,154,155,5,50,0,0,155,156,5,8,0,0,156,157,5,49,0,0,157,158,
        5,43,0,0,158,159,3,36,18,0,159,164,5,44,0,0,160,161,5,50,0,0,161,
        162,5,9,0,0,162,163,5,49,0,0,163,165,3,54,27,0,164,160,1,0,0,0,164,
        165,1,0,0,0,165,166,1,0,0,0,166,167,5,48,0,0,167,11,1,0,0,0,168,
        169,5,2,0,0,169,170,5,57,0,0,170,171,5,47,0,0,171,172,3,14,7,0,172,
        173,5,48,0,0,173,13,1,0,0,0,174,176,3,18,9,0,175,174,1,0,0,0,175,
        176,1,0,0,0,176,184,1,0,0,0,177,179,3,18,9,0,178,177,1,0,0,0,178,
        179,1,0,0,0,179,180,1,0,0,0,180,181,5,50,0,0,181,184,3,16,8,0,182,
        184,3,16,8,0,183,175,1,0,0,0,183,178,1,0,0,0,183,182,1,0,0,0,184,
        15,1,0,0,0,185,186,3,20,10,0,186,187,5,50,0,0,187,188,3,22,11,0,
        188,17,1,0,0,0,189,190,5,1,0,0,190,191,5,49,0,0,191,192,5,43,0,0,
        192,197,5,57,0,0,193,194,5,50,0,0,194,196,5,57,0,0,195,193,1,0,0,
        0,196,199,1,0,0,0,197,195,1,0,0,0,197,198,1,0,0,0,198,200,1,0,0,
        0,199,197,1,0,0,0,200,201,5,44,0,0,201,19,1,0,0,0,202,203,5,12,0,
        0,203,204,5,49,0,0,204,205,5,55,0,0,205,21,1,0,0,0,206,207,5,13,
        0,0,207,208,5,49,0,0,208,209,5,55,0,0,209,23,1,0,0,0,210,211,5,3,
        0,0,211,212,5,57,0,0,212,213,5,47,0,0,213,214,3,26,13,0,214,215,
        5,48,0,0,215,25,1,0,0,0,216,221,3,28,14,0,217,218,5,50,0,0,218,220,
        3,28,14,0,219,217,1,0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,221,222,
        1,0,0,0,222,27,1,0,0,0,223,221,1,0,0,0,224,225,5,14,0,0,225,226,
        5,49,0,0,226,234,5,55,0,0,227,228,5,15,0,0,228,229,5,49,0,0,229,
        234,3,30,15,0,230,231,5,16,0,0,231,232,5,49,0,0,232,234,3,32,16,
        0,233,224,1,0,0,0,233,227,1,0,0,0,233,230,1,0,0,0,234,29,1,0,0,0,
        235,236,7,0,0,0,236,31,1,0,0,0,237,238,5,47,0,0,238,243,3,34,17,
        0,239,240,5,50,0,0,240,242,3,34,17,0,241,239,1,0,0,0,242,245,1,0,
        0,0,243,241,1,0,0,0,243,244,1,0,0,0,244,246,1,0,0,0,245,243,1,0,
        0,0,246,247,5,48,0,0,247,251,1,0,0,0,248,249,5,47,0,0,249,251,5,
        48,0,0,250,237,1,0,0,0,250,248,1,0,0,0,251,33,1,0,0,0,252,253,5,
        57,0,0,253,254,5,49,0,0,254,255,3,82,41,0,255,35,1,0,0,0,256,261,
        3,38,19,0,257,258,5,50,0,0,258,260,3,38,19,0,259,257,1,0,0,0,260,
        263,1,0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,37,1,0,0,0,263,261,
        1,0,0,0,264,269,5,57,0,0,265,266,5,51,0,0,266,268,7,1,0,0,267,265,
        1,0,0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,274,
        1,0,0,0,271,269,1,0,0,0,272,274,5,55,0,0,273,264,1,0,0,0,273,272,
        1,0,0,0,274,39,1,0,0,0,275,276,5,10,0,0,276,277,5,57,0,0,277,278,
        5,47,0,0,278,279,3,42,21,0,279,280,5,48,0,0,280,41,1,0,0,0,281,283,
        3,44,22,0,282,281,1,0,0,0,282,283,1,0,0,0,283,288,1,0,0,0,284,286,
        5,50,0,0,285,287,3,48,24,0,286,285,1,0,0,0,286,287,1,0,0,0,287,289,
        1,0,0,0,288,284,1,0,0,0,288,289,1,0,0,0,289,43,1,0,0,0,290,291,5,
        11,0,0,291,292,5,49,0,0,292,293,5,43,0,0,293,294,3,46,23,0,294,295,
        5,44,0,0,295,45,1,0,0,0,296,301,5,57,0,0,297,298,5,50,0,0,298,300,
        5,57,0,0,299,297,1,0,0,0,300,303,1,0,0,0,301,299,1,0,0,0,301,302,
        1,0,0,0,302,47,1,0,0,0,303,301,1,0,0,0,304,305,5,1,0,0,305,306,5,
        49,0,0,306,307,5,43,0,0,307,312,5,57,0,0,308,309,5,50,0,0,309,311,
        5,57,0,0,310,308,1,0,0,0,311,314,1,0,0,0,312,310,1,0,0,0,312,313,
        1,0,0,0,313,315,1,0,0,0,314,312,1,0,0,0,315,316,5,44,0,0,316,49,
        1,0,0,0,317,322,3,52,26,0,318,319,5,50,0,0,319,321,3,52,26,0,320,
        318,1,0,0,0,321,324,1,0,0,0,322,320,1,0,0,0,322,323,1,0,0,0,323,
        51,1,0,0,0,324,322,1,0,0,0,325,326,7,2,0,0,326,53,1,0,0,0,327,328,
        3,56,28,0,328,55,1,0,0,0,329,334,3,58,29,0,330,331,5,21,0,0,331,
        333,3,58,29,0,332,330,1,0,0,0,333,336,1,0,0,0,334,332,1,0,0,0,334,
        335,1,0,0,0,335,57,1,0,0,0,336,334,1,0,0,0,337,342,3,60,30,0,338,
        339,5,20,0,0,339,341,3,60,30,0,340,338,1,0,0,0,341,344,1,0,0,0,342,
        340,1,0,0,0,342,343,1,0,0,0,343,59,1,0,0,0,344,342,1,0,0,0,345,346,
        5,22,0,0,346,349,3,60,30,0,347,349,3,62,31,0,348,345,1,0,0,0,348,
        347,1,0,0,0,349,61,1,0,0,0,350,351,5,45,0,0,351,352,3,54,27,0,352,
        353,5,46,0,0,353,356,1,0,0,0,354,356,3,64,32,0,355,350,1,0,0,0,355,
        354,1,0,0,0,356,63,1,0,0,0,357,358,3,68,34,0,358,359,3,66,33,0,359,
        360,3,68,34,0,360,372,1,0,0,0,361,362,3,68,34,0,362,363,5,41,0,0,
        363,364,5,43,0,0,364,365,3,84,42,0,365,366,5,44,0,0,366,372,1,0,
        0,0,367,368,3,68,34,0,368,369,5,42,0,0,369,370,3,82,41,0,370,372,
        1,0,0,0,371,357,1,0,0,0,371,361,1,0,0,0,371,367,1,0,0,0,372,65,1,
        0,0,0,373,374,7,3,0,0,374,67,1,0,0,0,375,376,3,70,35,0,376,69,1,
        0,0,0,377,382,3,72,36,0,378,379,7,4,0,0,379,381,3,72,36,0,380,378,
        1,0,0,0,381,384,1,0,0,0,382,380,1,0,0,0,382,383,1,0,0,0,383,71,1,
        0,0,0,384,382,1,0,0,0,385,390,3,74,37,0,386,387,7,5,0,0,387,389,
        3,74,37,0,388,386,1,0,0,0,389,392,1,0,0,0,390,388,1,0,0,0,390,391,
        1,0,0,0,391,73,1,0,0,0,392,390,1,0,0,0,393,394,5,38,0,0,394,399,
        3,74,37,0,395,396,5,39,0,0,396,399,3,74,37,0,397,399,3,76,38,0,398,
        393,1,0,0,0,398,395,1,0,0,0,398,397,1,0,0,0,399,75,1,0,0,0,400,401,
        5,45,0,0,401,402,3,68,34,0,402,403,5,46,0,0,403,406,1,0,0,0,404,
        406,3,78,39,0,405,400,1,0,0,0,405,404,1,0,0,0,406,77,1,0,0,0,407,
        413,5,53,0,0,408,413,5,54,0,0,409,413,5,55,0,0,410,413,5,52,0,0,
        411,413,3,80,40,0,412,407,1,0,0,0,412,408,1,0,0,0,412,409,1,0,0,
        0,412,410,1,0,0,0,412,411,1,0,0,0,413,79,1,0,0,0,414,419,5,57,0,
        0,415,416,5,51,0,0,416,418,5,57,0,0,417,415,1,0,0,0,418,421,1,0,
        0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,81,1,0,0,0,421,419,1,0,0,
        0,422,433,5,55,0,0,423,433,5,56,0,0,424,433,5,53,0,0,425,433,5,54,
        0,0,426,433,5,57,0,0,427,433,5,52,0,0,428,429,5,43,0,0,429,430,3,
        84,42,0,430,431,5,44,0,0,431,433,1,0,0,0,432,422,1,0,0,0,432,423,
        1,0,0,0,432,424,1,0,0,0,432,425,1,0,0,0,432,426,1,0,0,0,432,427,
        1,0,0,0,432,428,1,0,0,0,433,83,1,0,0,0,434,439,3,82,41,0,435,436,
        5,50,0,0,436,438,3,82,41,0,437,435,1,0,0,0,438,441,1,0,0,0,439,437,
        1,0,0,0,439,440,1,0,0,0,440,85,1,0,0,0,441,439,1,0,0,0,38,89,98,
        104,113,123,136,146,164,175,178,183,197,221,233,243,250,261,269,
        273,282,286,288,301,312,322,334,342,348,355,371,382,390,398,405,
        412,419,432,439
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RPLParser.__ATN) {
            RPLParser.__ATN = new antlr.ATNDeserializer().deserialize(RPLParser._serializedATN);
        }

        return RPLParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RPLParser.literalNames, RPLParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RPLParser.vocabulary;
    }

    private static readonly decisionsToDFA = RPLParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RPLParser.EOF, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_program;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public roleDeclaration(): RoleDeclarationContext | null {
        return this.getRuleContext(0, RoleDeclarationContext);
    }
    public userDeclaration(): UserDeclarationContext | null {
        return this.getRuleContext(0, UserDeclarationContext);
    }
    public resourceDeclaration(): ResourceDeclarationContext | null {
        return this.getRuleContext(0, ResourceDeclarationContext);
    }
    public groupDeclaration(): GroupDeclarationContext | null {
        return this.getRuleContext(0, GroupDeclarationContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_statement;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class RoleDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public roleBody(): RoleBodyContext {
        return this.getRuleContext(0, RoleBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EXTENDS, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_roleDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRoleDeclaration) {
             listener.enterRoleDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRoleDeclaration) {
             listener.exitRoleDeclaration(this);
        }
    }
}


export class RoleBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public rolePermissions(): RolePermissionsContext[];
    public rolePermissions(i: number): RolePermissionsContext | null;
    public rolePermissions(i?: number): RolePermissionsContext[] | RolePermissionsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RolePermissionsContext);
        }

        return this.getRuleContext(i, RolePermissionsContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_roleBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRoleBody) {
             listener.enterRoleBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRoleBody) {
             listener.exitRoleBody(this);
        }
    }
}


export class RolePermissionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERMISSIONS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.PERMISSIONS, 0);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COLON);
    	} else {
    		return this.getToken(RPLParser.COLON, i);
    	}
    }
    public LBRACKET(): antlr.TerminalNode[];
    public LBRACKET(i: number): antlr.TerminalNode | null;
    public LBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.LBRACKET);
    	} else {
    		return this.getToken(RPLParser.LBRACKET, i);
    	}
    }
    public permissionBlock(): PermissionBlockContext[];
    public permissionBlock(i: number): PermissionBlockContext | null;
    public permissionBlock(i?: number): PermissionBlockContext[] | PermissionBlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionBlockContext);
        }

        return this.getRuleContext(i, PermissionBlockContext);
    }
    public RBRACKET(): antlr.TerminalNode[];
    public RBRACKET(i: number): antlr.TerminalNode | null;
    public RBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.RBRACKET);
    	} else {
    		return this.getToken(RPLParser.RBRACKET, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public CAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CAN, 0);
    }
    public permission(): PermissionContext[];
    public permission(i: number): PermissionContext | null;
    public permission(i?: number): PermissionContext[] | PermissionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionContext);
        }

        return this.getRuleContext(i, PermissionContext);
    }
    public RESOURCES(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RESOURCES, 0);
    }
    public resourceList(): ResourceListContext | null {
        return this.getRuleContext(0, ResourceListContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_rolePermissions;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRolePermissions) {
             listener.enterRolePermissions(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRolePermissions) {
             listener.exitRolePermissions(this);
        }
    }
}


export class PermissionBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public ACTIONS(): antlr.TerminalNode {
        return this.getToken(RPLParser.ACTIONS, 0)!;
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COLON);
    	} else {
    		return this.getToken(RPLParser.COLON, i);
    	}
    }
    public LBRACKET(): antlr.TerminalNode[];
    public LBRACKET(i: number): antlr.TerminalNode | null;
    public LBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.LBRACKET);
    	} else {
    		return this.getToken(RPLParser.LBRACKET, i);
    	}
    }
    public actionList(): ActionListContext {
        return this.getRuleContext(0, ActionListContext)!;
    }
    public RBRACKET(): antlr.TerminalNode[];
    public RBRACKET(i: number): antlr.TerminalNode | null;
    public RBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.RBRACKET);
    	} else {
    		return this.getToken(RPLParser.RBRACKET, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public RESOURCES(): antlr.TerminalNode {
        return this.getToken(RPLParser.RESOURCES, 0)!;
    }
    public resourceList(): ResourceListContext {
        return this.getRuleContext(0, ResourceListContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public CONDITIONS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CONDITIONS, 0);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_permissionBlock;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPermissionBlock) {
             listener.enterPermissionBlock(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPermissionBlock) {
             listener.exitPermissionBlock(this);
        }
    }
}


export class UserDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public USER(): antlr.TerminalNode {
        return this.getToken(RPLParser.USER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public userBody(): UserBodyContext {
        return this.getRuleContext(0, UserBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserDeclaration) {
             listener.enterUserDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserDeclaration) {
             listener.exitUserDeclaration(this);
        }
    }
}


export class UserBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userRoles(): UserRolesContext | null {
        return this.getRuleContext(0, UserRolesContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.COMMA, 0);
    }
    public validPeriod(): ValidPeriodContext | null {
        return this.getRuleContext(0, ValidPeriodContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserBody) {
             listener.enterUserBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserBody) {
             listener.exitUserBody(this);
        }
    }
}


export class ValidPeriodContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public validFrom(): ValidFromContext {
        return this.getRuleContext(0, ValidFromContext)!;
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(RPLParser.COMMA, 0)!;
    }
    public validUntil(): ValidUntilContext {
        return this.getRuleContext(0, ValidUntilContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validPeriod;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidPeriod) {
             listener.enterValidPeriod(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidPeriod) {
             listener.exitValidPeriod(this);
        }
    }
}


export class UserRolesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userRoles;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserRoles) {
             listener.enterUserRoles(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserRoles) {
             listener.exitUserRoles(this);
        }
    }
}


export class ValidFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALID_FROM(): antlr.TerminalNode {
        return this.getToken(RPLParser.VALID_FROM, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(RPLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validFrom;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidFrom) {
             listener.enterValidFrom(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidFrom) {
             listener.exitValidFrom(this);
        }
    }
}


export class ValidUntilContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALID_UNTIL(): antlr.TerminalNode {
        return this.getToken(RPLParser.VALID_UNTIL, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(RPLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validUntil;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidUntil) {
             listener.enterValidUntil(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidUntil) {
             listener.exitValidUntil(this);
        }
    }
}


export class ResourceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RESOURCE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RESOURCE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public resourceBody(): ResourceBodyContext {
        return this.getRuleContext(0, ResourceBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceDeclaration) {
             listener.enterResourceDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceDeclaration) {
             listener.exitResourceDeclaration(this);
        }
    }
}


export class ResourceBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resourceProperty(): ResourcePropertyContext[];
    public resourceProperty(i: number): ResourcePropertyContext | null;
    public resourceProperty(i?: number): ResourcePropertyContext[] | ResourcePropertyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ResourcePropertyContext);
        }

        return this.getRuleContext(i, ResourcePropertyContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceBody) {
             listener.enterResourceBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceBody) {
             listener.exitResourceBody(this);
        }
    }
}


export class ResourcePropertyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PATH(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.PATH, 0);
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.TYPE, 0);
    }
    public resourceType(): ResourceTypeContext | null {
        return this.getRuleContext(0, ResourceTypeContext);
    }
    public METADATA(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.METADATA, 0);
    }
    public metadataBlock(): MetadataBlockContext | null {
        return this.getRuleContext(0, MetadataBlockContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceProperty;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceProperty) {
             listener.enterResourceProperty(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceProperty) {
             listener.exitResourceProperty(this);
        }
    }
}


export class ResourceTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public API(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.API, 0);
    }
    public FOLDER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.FOLDER, 0);
    }
    public DATABASE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.DATABASE, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceType;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceType) {
             listener.enterResourceType(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceType) {
             listener.exitResourceType(this);
        }
    }
}


export class MetadataBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public metadataEntry(): MetadataEntryContext[];
    public metadataEntry(i: number): MetadataEntryContext | null;
    public metadataEntry(i?: number): MetadataEntryContext[] | MetadataEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetadataEntryContext);
        }

        return this.getRuleContext(i, MetadataEntryContext);
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_metadataBlock;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMetadataBlock) {
             listener.enterMetadataBlock(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMetadataBlock) {
             listener.exitMetadataBlock(this);
        }
    }
}


export class MetadataEntryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_metadataEntry;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMetadataEntry) {
             listener.enterMetadataEntry(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMetadataEntry) {
             listener.exitMetadataEntry(this);
        }
    }
}


export class ResourceListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resourceRef(): ResourceRefContext[];
    public resourceRef(i: number): ResourceRefContext | null;
    public resourceRef(i?: number): ResourceRefContext[] | ResourceRefContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ResourceRefContext);
        }

        return this.getRuleContext(i, ResourceRefContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceList) {
             listener.enterResourceList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceList) {
             listener.exitResourceList(this);
        }
    }
}


export class ResourceRefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DOT);
    	} else {
    		return this.getToken(RPLParser.DOT, i);
    	}
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.STAR);
    	} else {
    		return this.getToken(RPLParser.STAR, i);
    	}
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceRef;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceRef) {
             listener.enterResourceRef(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceRef) {
             listener.exitResourceRef(this);
        }
    }
}


export class GroupDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GROUP(): antlr.TerminalNode {
        return this.getToken(RPLParser.GROUP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public groupBody(): GroupBodyContext {
        return this.getRuleContext(0, GroupBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupDeclaration) {
             listener.enterGroupDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupDeclaration) {
             listener.exitGroupDeclaration(this);
        }
    }
}


export class GroupBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public groupMembers(): GroupMembersContext | null {
        return this.getRuleContext(0, GroupMembersContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.COMMA, 0);
    }
    public groupRoles(): GroupRolesContext | null {
        return this.getRuleContext(0, GroupRolesContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupBody) {
             listener.enterGroupBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupBody) {
             listener.exitGroupBody(this);
        }
    }
}


export class GroupMembersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MEMBERS(): antlr.TerminalNode {
        return this.getToken(RPLParser.MEMBERS, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public memberList(): MemberListContext {
        return this.getRuleContext(0, MemberListContext)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupMembers;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupMembers) {
             listener.enterGroupMembers(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupMembers) {
             listener.exitGroupMembers(this);
        }
    }
}


export class MemberListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_memberList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMemberList) {
             listener.enterMemberList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMemberList) {
             listener.exitMemberList(this);
        }
    }
}


export class GroupRolesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupRoles;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupRoles) {
             listener.enterGroupRoles(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupRoles) {
             listener.exitGroupRoles(this);
        }
    }
}


export class ActionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public permission(): PermissionContext[];
    public permission(i: number): PermissionContext | null;
    public permission(i?: number): PermissionContext[] | PermissionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionContext);
        }

        return this.getRuleContext(i, PermissionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_actionList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterActionList) {
             listener.enterActionList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitActionList) {
             listener.exitActionList(this);
        }
    }
}


export class PermissionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READ(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.READ, 0);
    }
    public WRITE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.WRITE, 0);
    }
    public MODIFY(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.MODIFY, 0);
    }
    public START(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.START, 0);
    }
    public STOP(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STOP, 0);
    }
    public DEPLOY(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.DEPLOY, 0);
    }
    public DELETE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.DELETE, 0);
    }
    public EXECUTE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EXECUTE, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STAR, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_permission;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPermission) {
             listener.enterPermission(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPermission) {
             listener.exitPermission(this);
        }
    }
}


export class ConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public orCondition(): OrConditionContext {
        return this.getRuleContext(0, OrConditionContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_condition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterCondition) {
             listener.enterCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitCondition) {
             listener.exitCondition(this);
        }
    }
}


export class OrConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andCondition(): AndConditionContext[];
    public andCondition(i: number): AndConditionContext | null;
    public andCondition(i?: number): AndConditionContext[] | AndConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndConditionContext);
        }

        return this.getRuleContext(i, AndConditionContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.OR);
    	} else {
    		return this.getToken(RPLParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_orCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterOrCondition) {
             listener.enterOrCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitOrCondition) {
             listener.exitOrCondition(this);
        }
    }
}


export class AndConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public notCondition(): NotConditionContext[];
    public notCondition(i: number): NotConditionContext | null;
    public notCondition(i?: number): NotConditionContext[] | NotConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(NotConditionContext);
        }

        return this.getRuleContext(i, NotConditionContext);
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.AND);
    	} else {
    		return this.getToken(RPLParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_andCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAndCondition) {
             listener.enterAndCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAndCondition) {
             listener.exitAndCondition(this);
        }
    }
}


export class NotConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.NOT, 0);
    }
    public notCondition(): NotConditionContext | null {
        return this.getRuleContext(0, NotConditionContext);
    }
    public primaryCondition(): PrimaryConditionContext | null {
        return this.getRuleContext(0, PrimaryConditionContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_notCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterNotCondition) {
             listener.enterNotCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitNotCondition) {
             listener.exitNotCondition(this);
        }
    }
}


export class PrimaryConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LPAREN, 0);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RPAREN, 0);
    }
    public comparison(): ComparisonContext | null {
        return this.getRuleContext(0, ComparisonContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_primaryCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPrimaryCondition) {
             listener.enterPrimaryCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPrimaryCondition) {
             listener.exitPrimaryCondition(this);
        }
    }
}


export class ComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public comparisonOp(): ComparisonOpContext | null {
        return this.getRuleContext(0, ComparisonOpContext);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.IN, 0);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LBRACKET, 0);
    }
    public valueList(): ValueListContext | null {
        return this.getRuleContext(0, ValueListContext);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RBRACKET, 0);
    }
    public CONTAINS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CONTAINS, 0);
    }
    public value(): ValueContext | null {
        return this.getRuleContext(0, ValueContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_comparison;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterComparison) {
             listener.enterComparison(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitComparison) {
             listener.exitComparison(this);
        }
    }
}


export class ComparisonOpContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EQ, 0);
    }
    public NE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.NE, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.GE, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_comparisonOp;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterComparisonOp) {
             listener.enterComparisonOp(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitComparisonOp) {
             listener.exitComparisonOp(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpr(): AdditiveExprContext {
        return this.getRuleContext(0, AdditiveExprContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_expression;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class AdditiveExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpr(): MultiplicativeExprContext[];
    public multiplicativeExpr(i: number): MultiplicativeExprContext | null;
    public multiplicativeExpr(i?: number): MultiplicativeExprContext[] | MultiplicativeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExprContext);
        }

        return this.getRuleContext(i, MultiplicativeExprContext);
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.PLUS);
    	} else {
    		return this.getToken(RPLParser.PLUS, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.MINUS);
    	} else {
    		return this.getToken(RPLParser.MINUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_additiveExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAdditiveExpr) {
             listener.enterAdditiveExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAdditiveExpr) {
             listener.exitAdditiveExpr(this);
        }
    }
}


export class MultiplicativeExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unaryExpr(): UnaryExprContext[];
    public unaryExpr(i: number): UnaryExprContext | null;
    public unaryExpr(i?: number): UnaryExprContext[] | UnaryExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExprContext);
        }

        return this.getRuleContext(i, UnaryExprContext);
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.STAR);
    	} else {
    		return this.getToken(RPLParser.STAR, i);
    	}
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DIV);
    	} else {
    		return this.getToken(RPLParser.DIV, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_multiplicativeExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMultiplicativeExpr) {
             listener.enterMultiplicativeExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMultiplicativeExpr) {
             listener.exitMultiplicativeExpr(this);
        }
    }
}


export class UnaryExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.PLUS, 0);
    }
    public unaryExpr(): UnaryExprContext | null {
        return this.getRuleContext(0, UnaryExprContext);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.MINUS, 0);
    }
    public primaryExpr(): PrimaryExprContext | null {
        return this.getRuleContext(0, PrimaryExprContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_unaryExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUnaryExpr) {
             listener.enterUnaryExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUnaryExpr) {
             listener.exitUnaryExpr(this);
        }
    }
}


export class PrimaryExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RPAREN, 0);
    }
    public atom(): AtomContext | null {
        return this.getRuleContext(0, AtomContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_primaryExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPrimaryExpr) {
             listener.enterPrimaryExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPrimaryExpr) {
             listener.exitPrimaryExpr(this);
        }
    }
}


export class AtomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.INTEGER, 0);
    }
    public REAL(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.REAL, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.BOOLEAN, 0);
    }
    public qualifiedName(): QualifiedNameContext | null {
        return this.getRuleContext(0, QualifiedNameContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_atom;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAtom) {
             listener.enterAtom(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAtom) {
             listener.exitAtom(this);
        }
    }
}


export class QualifiedNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DOT);
    	} else {
    		return this.getToken(RPLParser.DOT, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_qualifiedName;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterQualifiedName) {
             listener.enterQualifiedName(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitQualifiedName) {
             listener.exitQualifiedName(this);
        }
    }
}


export class ValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public CHARACTER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CHARACTER, 0);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.INTEGER, 0);
    }
    public REAL(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.REAL, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.IDENTIFIER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.BOOLEAN, 0);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LBRACKET, 0);
    }
    public valueList(): ValueListContext | null {
        return this.getRuleContext(0, ValueListContext);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RBRACKET, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_value;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValue) {
             listener.enterValue(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValue) {
             listener.exitValue(this);
        }
    }
}


export class ValueListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public value(): ValueContext[];
    public value(i: number): ValueContext | null;
    public value(i?: number): ValueContext[] | ValueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }

        return this.getRuleContext(i, ValueContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_valueList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValueList) {
             listener.enterValueList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValueList) {
             listener.exitValueList(this);
        }
    }
}
