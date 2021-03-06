/***********************************************************************
 * Module:  Htba.java
 * Author:  Administrator
 * Purpose: Defines the Class Htba
 ***********************************************************************/

package domain.htba;

import enumerates.Sfyx_st;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 合同备案信息
 */
@Table(name = "T_XMGL_HTBA")
@Entity
public class Htba {
    /**
     * ID
     */
    @Id
    @SequenceGenerator(name = "seq_htba", sequenceName = "SEQ_T_XMGL_HTBA", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_htba")
    private Integer id;

    /**
     * 合同签订id
     */
    @Column(name = "HTQD_ID")
    private Integer htqd_id;
    /**
     * 合同类别NO
     */
    @Column(name = "HTLB_NO")
    private Integer htlb_no;
    /**
     * 分包类别
     */
    @Column(name = "FBGCLB_NO")
    private Integer fbgclb_no;
    /**
     * 合同备案号
     */
    @Column(name = "HTBAH")
    private String htbah;
    /**
     * 合同名称
     */
    @Column(name = "HTMC")
    private String htmc;
    /**
     * 项目ID
     */
    @Column(name = "XM_ID")
    private Integer xm_id;
    /**
     * 项目名称
     */
    @Column(name = "XMMC")
    private String xmmc;
    /**
     * 建设规模
     */
    @Column(name = "JSGM")
    private Double jsgm;
    /**
     * 项目地址
     */
    @Column(name = "XMDZ")
    private String xmdz;
    /**
     * 标段ID
     */
    @Column(name = "BD_ID")
    private Integer bd_id;
    /**
     * 标段名称
     */
    @Column(name = "BDMC")
    private String bdmc;
    /**
     * 甲方单位ID
     */
    @Column(name = "JFDW_ID")
    private Integer jfdw_id;
    /**
     * 甲方单位名称
     */
    @Column(name = "JFDWMC")
    private String jfdwmc;
    /**
     * 项目负责人id
     */
    @Column(name = "XMFZR_ID")
    private Integer xmfzr_id;
    /**
     * 项目负责人名称
     */
    @Column(name = "XMFZRXM")
    private String xmfzrxm;
    /**
     * 甲方合同签订人姓名
     */
    @Column(name = "JFHTQDR")
    private String jfhtqdr;
    /**
     * 甲方签订时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "JFQDSJ")
    private Date jfqdsj;
    /**
     * 乙方单位ID
     */
    @Column(name = "YFDW_ID")
    private Integer yfdw_id;
    /**
     * 乙方单位名称
     */
    @Column(name = "YFDWMC")
    private String yfdwmc;
//    @Column(name = "YFDWZZ_NO")
//    private Integer yfdwzz_no;
    /**
     * 项目经理id
     */
    @Column(name = "XMJL_ID")
    private Integer xmjl_id;
    /**
     * 项目经理名称
     */
    @Column(name = "XMJLXM")
    private String xmjlxm;
//    /**
//     * 项目总监id
//     */
//    @Column(name = "XMZJ_ID")
//    private Integer xmzj_id;
//    /**
//     * 项目总监姓名
//     */
//    @Column(name = "XMZJXM")
//    private String xmzjxm;
    /**
     * 乙方合同签订人姓名
     */
    @Column(name = "YFHTQDRMC")
    private String yfhtqdrmc;
    /**
     * 乙方签订时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "YFQDSJ")
    private Date yfqdsj;
    /**
     * 合同金额
     */
    @Column(name = "HTJE")
    private Float htje;
    /**
     * 合同开工日期
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "HTKGRQ")
    private Date htkgrq;
    /**
     * 合同竣工日期
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "HTJGRQ")
    private Date htjgrq;

    /**
     * 合同备案单位工程关联信息
     */
    @OneToMany(targetEntity = Htbadwgcgl.class, mappedBy = "htba_id", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @Where(clause = " sfyx_st=1 ")
    private List<Htbadwgcgl> dwgcglList;

    /**
     * 安全措施费
     */
    @Column(name = "AQCSF")
    private Float aqcsf;
    /**
     * 安措费银行账号
     */
    @Transient
    private String acfyhzh;
//    /**
//     * 备案状态
//     */
//    @Enumerated(value = EnumType.ORDINAL)
//    private Bazt_st bazt_st;
    /**
     * 附件ID
     */
    @Column(name = "FJ_ID")
    private String fj_id;
    /**
     * 创建人ID
     */
    @Column(name = "CJR_ID")
    private Integer cjr_id;
    /**
     * 创建时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;
    /**
     * 修改人ID
     */
    @Column(name = "XGR_ID")
    private Integer xgr_id;
    /**
     * 修改时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;
    /**
     * 是否有效 0:无效 1：有效
     */
    @Enumerated(value = EnumType.ORDINAL)
    private Sfyx_st sfyx_st;

    /**
     * 施工总承包单位资质
     */
    @Column(name = "SGZCBDWZZ")
    private String sgzcbdwzz;

    /**
     * 安措费支付方式
     */
    @Column(name = "ACFZFFS")
    private String acfzffs;

    /**
     * 安措费银行
     */
    @Column(name = "ACFYH")
    private String acfyh;

    /**
     * 安措费账号
     */
    @Column(name = "ACFZH")
    private String acfzh;

    /**
     * 农民工工资银行
     */
    @Column(name = "NMGYH")
    private String nmgyh;

    /**
     * 农民工工资账号
     */
    @Column(name = "NMGZH")
    private String nmgzh;

    /**
     * 劳务分包内容
     */
    @Column(name = "LWFBNRNOS")
    private String lwfbnrnos;
    /**
     * 监理单位
     */
    @Column(name = "JLDW")
    private String jldw;

    @Formula("(select x.xmszqx_no from T_XMGL_BDXX b left join T_XMGL_XMXX x on x.id = b.xm_id where b.id=bd_id and rownum < 2 )")
    private String xzqh_no;

    @Formula("(select b.gczj from T_XMGL_BDXX b where b.id=bd_id and rownum < 2 )")
    private Double gczj;

    @Column(name = "HTBALB")
    private String htbalb;
     //是否签章
    @Column(name = "SFQZ")
    private String sfqz;

    public String getSfqz() {
        return sfqz;
    }

    public void setSfqz(String sfqz) {
        this.sfqz = sfqz;
    }

    /**
     * 安措费银行NO
     */
    @Column(name = "ACFYH_NO")
    private Integer acfyh_no;

    public Integer getAcfyh_no() {
        return acfyh_no;
    }

    public void setAcfyh_no(Integer acfyh_no) {
        this.acfyh_no = acfyh_no;
    }

    /**
     * 合同签章文件
     */
    @Formula("(select t.wjmc from t_xmgl_htqd t where t.id = htqd_id)")
    private String htdzpath;

    public String getHtbalb() {
        return htbalb;
    }

    public void setHtbalb(String htbalb) {
        this.htbalb = htbalb;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHtlb_no() {
        return htlb_no;
    }

    public void setHtlb_no(Integer htlb_no) {
        this.htlb_no = htlb_no;
    }

    public String getHtbah() {
        return htbah;
    }

    public void setHtbah(String htbah) {
        this.htbah = htbah;
    }

    public String getHtmc() {
        return htmc;
    }

    public void setHtmc(String htmc) {
        this.htmc = htmc;
    }

    public Integer getXm_id() {
        return xm_id;
    }

    public void setXm_id(Integer xm_id) {
        this.xm_id = xm_id;
    }

    public String getXmmc() {
        return xmmc;
    }

    public void setXmmc(String xmmc) {
        this.xmmc = xmmc;
    }

    public Double getJsgm() {
        return jsgm;
    }

    public void setJsgm(Double jsgm) {
        this.jsgm = jsgm;
    }

    public String getXmdz() {
        return xmdz;
    }

    public void setXmdz(String xmdz) {
        this.xmdz = xmdz;
    }

    public Integer getBd_id() {
        return bd_id;
    }

    public void setBd_id(Integer bd_id) {
        this.bd_id = bd_id;
    }

    public String getBdmc() {
        return bdmc;
    }

    public void setBdmc(String bdmc) {
        this.bdmc = bdmc;
    }

    public Integer getJfdw_id() {
        return jfdw_id;
    }

    public void setJfdw_id(Integer jfdw_id) {
        this.jfdw_id = jfdw_id;
    }

    public String getJfdwmc() {
        return jfdwmc;
    }

    public void setJfdwmc(String jfdwmc) {
        this.jfdwmc = jfdwmc;
    }

    public Integer getXmfzr_id() {
        return xmfzr_id;
    }

    public void setXmfzr_id(Integer xmfzr_id) {
        this.xmfzr_id = xmfzr_id;
    }

    public String getXmfzrxm() {
        return xmfzrxm;
    }

    public void setXmfzrxm(String xmfzrxm) {
        this.xmfzrxm = xmfzrxm;
    }

    public String getJfhtqdr() {
        return jfhtqdr;
    }

    public void setJfhtqdr(String jfhtqdr) {
        this.jfhtqdr = jfhtqdr;
    }

    public Date getJfqdsj() {
        return jfqdsj;
    }

    public void setJfqdsj(Date jfqdsj) {
        this.jfqdsj = jfqdsj;
    }

    public Integer getYfdw_id() {
        return yfdw_id;
    }

    public void setYfdw_id(Integer yfdw_id) {
        this.yfdw_id = yfdw_id;
    }

    public String getYfdwmc() {
        return yfdwmc;
    }

    public void setYfdwmc(String yfdwmc) {
        this.yfdwmc = yfdwmc;
    }

//    public Integer getYfdwzz_no() {
//        return yfdwzz_no;
//    }
//
//    public void setYfdwzz_no(Integer yfdwzz_no) {
//        this.yfdwzz_no = yfdwzz_no;
//    }

    public Integer getXmjl_id() {
        return xmjl_id;
    }

    public void setXmjl_id(Integer xmjl_id) {
        this.xmjl_id = xmjl_id;
    }

    public String getXmjlxm() {
        return xmjlxm;
    }

    public void setXmjlxm(String xmjlxm) {
        this.xmjlxm = xmjlxm;
    }

//    public Integer getXmzj_id() {
//        return xmzj_id;
//    }
//
//    public void setXmzj_id(Integer xmzj_id) {
//        this.xmzj_id = xmzj_id;
//    }
//
//    public String getXmzjxm() {
//        return xmzjxm;
//    }
//
//    public void setXmzjxm(String xmzjxm) {
//        this.xmzjxm = xmzjxm;
//    }

    public String getYfhtqdrmc() {
        return yfhtqdrmc;
    }

    public void setYfhtqdrmc(String yfhtqdrmc) {
        this.yfhtqdrmc = yfhtqdrmc;
    }

    public Date getYfqdsj() {
        return yfqdsj;
    }

    public void setYfqdsj(Date yfqdsj) {
        this.yfqdsj = yfqdsj;
    }

    public Float getHtje() {
        return htje;
    }

    public void setHtje(Float htje) {
        this.htje = htje;
    }

    public Date getHtkgrq() {
        return htkgrq;
    }

    public void setHtkgrq(Date htkgrq) {
        this.htkgrq = htkgrq;
    }

    public Date getHtjgrq() {
        return htjgrq;
    }

    public void setHtjgrq(Date htjgrq) {
        this.htjgrq = htjgrq;
    }

    public Float getAqcsf() {
        return aqcsf;
    }

    public void setAqcsf(Float aqcsf) {
        this.aqcsf = aqcsf;
    }

    public String getAcfyhzh() {
        return acfyhzh;
    }

    public void setAcfyhzh(String acfyhzh) {
        this.acfyhzh = acfyhzh;
    }

    public String getFj_id() {
        return fj_id;
    }

    public void setFj_id(String fj_id) {
        this.fj_id = fj_id;
    }

    public Integer getCjr_id() {
        return cjr_id;
    }

    public void setCjr_id(Integer cjr_id) {
        this.cjr_id = cjr_id;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public Integer getXgr_id() {
        return xgr_id;
    }

    public void setXgr_id(Integer xgr_id) {
        this.xgr_id = xgr_id;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public Sfyx_st getSfyx_st() {
        return sfyx_st;
    }

    public void setSfyx_st(Sfyx_st sfyx_st) {
        this.sfyx_st = sfyx_st;
    }

    public List<Htbadwgcgl> getDwgcglList() {
        return dwgcglList;
    }

    public void setDwgcglList(List<Htbadwgcgl> dwgcglList) {
        this.dwgcglList = dwgcglList;
    }

    public String getSgzcbdwzz() {
        return sgzcbdwzz;
    }

    public void setSgzcbdwzz(String sgzcbdwzz) {
        this.sgzcbdwzz = sgzcbdwzz;
    }

    public String getAcfzffs() {
        return acfzffs;
    }

    public void setAcfzffs(String acfzffs) {
        this.acfzffs = acfzffs;
    }

    public String getLwfbnrnos() {
        return lwfbnrnos;
    }

    public void setLwfbnrnos(String lwfbnrnos) {
        this.lwfbnrnos = lwfbnrnos;
    }

    public String getJldw() {
        return jldw;
    }

    public void setJldw(String jldw) {
        this.jldw = jldw;
    }

    public String getXzqh_no() {
        return xzqh_no;
    }

    public void setXzqh_no(String xzqh_no) {
        this.xzqh_no = xzqh_no;
    }

    public Double getGczj() {
        return gczj;
    }

    public void setGczj(Double gczj) {
        this.gczj = gczj;
    }

    public String getAcfyh() {
        return acfyh;
    }

    public void setAcfyh(String acfyh) {
        this.acfyh = acfyh;
    }

    public String getAcfzh() {
        return acfzh;
    }

    public void setAcfzh(String acfzh) {
        this.acfzh = acfzh;
    }

    public String getNmgyh() {
        return nmgyh;
    }

    public void setNmgyh(String nmgyh) {
        this.nmgyh = nmgyh;
    }

    public String getNmgzh() {
        return nmgzh;
    }

    public void setNmgzh(String nmgzh) {
        this.nmgzh = nmgzh;
    }

    public Integer getHtqd_id() {
        return htqd_id;
    }

    public void setHtqd_id(Integer htqd_id) {
        this.htqd_id = htqd_id;
    }

    public String getHtdzpath() {
        return htdzpath;
    }

    public void setHtdzpath(String htdzpath) {
        this.htdzpath = htdzpath;
    }

    public Integer getFbgclb_no() {
        return fbgclb_no;
    }

    public void setFbgclb_no(Integer fbgclb_no) {
        this.fbgclb_no = fbgclb_no;
    }
}